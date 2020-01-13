/* eslint-disable no-nested-ternary */
import moment from 'moment';
import queryString from 'query-string';
import _isEmail from 'validator/lib/isEmail';
import _isEmpty from 'validator/lib/isEmpty';
import _isNumeric from 'validator/lib/isNumeric';
import _isURL from 'validator/lib/isURL';
import {
  StorageKey,
  UserRole,
  HeaderLeftTabs,
  ErrorMsg,
  DateConversionType
} from './constants';

const appUtils = {
  delay: (millisecond = 1000) => new Promise(res => setTimeout(res, millisecond)),

  clone: (data, type = {}, shallow = true) => {
    if (shallow)
      return Object.assign(type, data);
    return JSON.parse(JSON.stringify(data));
  },

  merge: (target, ...sources) => {
    return Object.assign(target, sources);
  },

  hasProperty: (obj, property) => {
    return obj != null && Object.prototype.hasOwnProperty.call(obj, property);
  },

  filterList: (dataList, key, filterKeyword = '') => {
    return dataList.filter(item => item[key].toLowerCase().includes(filterKeyword.toLowerCase()));
  },

  compareValues: (key, order = 'asc') => {
    return (a, b) => {
      if (appUtils.hasProperty(a, key) && !appUtils.hasProperty(b, key)) {
        // property does exist in a but not in b, bring a to top
        return -1;
      }
      if (!appUtils.hasProperty(a, key) && appUtils.hasProperty(b, key)) {
        // property does exist in b but not in a, bring b to top
        return 1;
      }
      if (!appUtils.hasProperty(a, key) && !appUtils.hasProperty(b, key)) {
        // property doesn't exist on either object
        return 0;
      }

      if (a[key] === b[key]) {
        return 0;
      }

      const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return ((order === 'desc') ? (comparison * -1) : comparison);
    };
  },

  dataURItoBlob: (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  },

  compareLists: (dataList1, dataList2, key) => {
    if (dataList1 == null && dataList2 == null) {
      return true;
    }
    if ((dataList1 != null && dataList2 == null) || (dataList1 == null && dataList2 != null) || dataList1.length !== dataList2.length) {
      return false;
    }
    const sortedList1 = appUtils.clone(dataList1, []).sort(appUtils.compareValues(key));
    const sortedList2 = appUtils.clone(dataList2, []).sort(appUtils.compareValues(key));
    for (let index = 0; index < sortedList1.length; index += 1) {
      if (sortedList1[index][key] !== sortedList2[index][key]) {
        return false;
      }
    }
    return true;
  },

  overwriteDataInList: (dataList, key, data) => {
    const dataListClone = appUtils.clone(dataList, []);
    const index = dataListClone.findIndex(item => item[key] === data[key]);
    dataListClone.splice(index, 1, data);
    return dataListClone;
  },

  addKRUsingContext: (dataList, data, context) => {
    const dataListClone = appUtils.clone(dataList, []);
    let index = dataListClone.findIndex(item => item.objective_id === context[0]);
    let objective = dataListClone[index];

    // reached final objective. Update this with updated data
    if (context.length === 1) {
      if (data.key_results) {
        dataListClone.splice(index, 1, { ...data, isOpen: true });
      } else {
        dataListClone.splice(index, 1, { ...data, key_results: objective.key_results, key_results_count: objective.key_results_count + 1, isOpen: true });
      }
      return dataListClone;
    }

    let i = 1;
    while (i < context.length) {
      if (i === context.length - 1) {
        if (objective.key_results == null) {
          objective.key_results = [];
        }

        // eslint-disable-next-line no-loop-func
        index = objective.key_results.findIndex(item => item.objective_id === context[i]);

        if (index === -1) {
          const newKRList = appUtils.clone(objective.key_results, []);
          newKRList.push(data);
          objective.key_results = newKRList;
          objective.key_results_count += 1;
        } else if (data.key_results) {
          objective.key_results.splice(index, 1, { ...data, isOpen: true });
        } else {
          objective.key_results.splice(index, 1, { ...data, key_results: objective.key_results, isOpen: true  });
        }
        break;
      }

      if (objective.key_results == null) {
        objective.key_results = [];
      }

      // eslint-disable-next-line no-loop-func
      index = objective.key_results.findIndex(item => item.objective_id === context[i]);
      objective = objective.key_results[index];
      i += 1;
    }
    return dataListClone;
  },

  updateObjectiveUsingContext: (dataList, data, context) => {
    if (!context || !context.length) return dataList;
    return dataList
      .map(obj => {
        if (obj.objective_id !== context[0])
          return obj;
        if (context.length === 1) {
          return { ...data, key_results: obj.key_results, key_results_count: obj.key_results_count, alignment_of: obj.alignment_of, isOpen: obj.isOpen };
        }
        let currentObjective = obj;
        let parent = obj;
        let index = -1;
        for (let i = 1; i <= context.length - 1; i += 1) {
          parent = currentObjective;
          index = parent.key_results.findIndex(item => item.objective_id === context[i]);
          currentObjective = currentObjective.key_results[index];
        }
        if (index === -1)
          return parent;
        parent.key_results.splice(index, 1, { ...data, key_results: currentObjective.key_results, key_results_count: currentObjective.key_results_count, alignment_of: parent.alignment_of, isOpen: currentObjective.isOpen });
        return obj;
      });
  },

  updatePathMap: (objective, pathMap, basePath) => {
    const { objective_id } = objective;
    const currentPath = basePath.length > 0 && basePath[basePath.length - 1] === objective_id ? basePath : basePath.concat(objective_id);
    const updatedPathMap = { ...pathMap, [objective_id]: currentPath };
    return objective.key_results.map(kr => appUtils.updatePathMap(kr, updatedPathMap, currentPath))
      .reduce((current, pm) => ({
        ...current,
        ...pm,
      }),
      updatedPathMap,
      );
  },

  createPathMap: (dataList) => {
    return dataList.map(objective => appUtils.updatePathMap(objective, {}, []))
      .reduce((pathMap, pm) => ({
        ...pathMap,
        ...pm,
      }),
      {},
      );
  },

  updateObjectiveOpenStateUsingContext: (dataList, obj, state, pathMap) => {
    const dataListClone = appUtils.clone(dataList, []);
    if (!pathMap || !pathMap.length) return dataListClone; // objective opened from notifications
    let index = dataListClone.findIndex(item => item.objective_id === pathMap[0]);
    let objective = dataListClone[index];

    if (pathMap.length === 1) {
      dataListClone[index] = { ...obj, isOpen: state };
      return dataListClone;
    }

    let currentObjective = objective;
    for (let i = 1; i <= pathMap.length - 1; i += 1) {
      objective = currentObjective;
      // eslint-disable-next-line no-loop-func
      index = currentObjective.key_results.findIndex(item => item.objective_id === pathMap[i]);
      currentObjective = currentObjective.key_results[index];
    }

    objective.key_results.splice(index, 1, { ...obj, isOpen: state });
    return dataListClone;
  },

  getUpdatedAlignmentTree: (alignment, objective) => {
    let currentObjective = alignment.key_results[0];
    while (currentObjective.objective_id !== objective.objective_id) {
      // eslint-disable-next-line prefer-destructuring
      currentObjective = currentObjective.key_results[0];
    }
    currentObjective.key_results = objective.key_results;
    currentObjective.key_results_count = objective.key_results_count;
    currentObjective.isOpen = objective.isOpen;
    return alignment;
  },

  replaceObjectiveAlignment: (dataList, oldObjective) => {
    const dataListClone = appUtils.clone(dataList, []);
    const index = dataListClone.findIndex(obj =>  obj.objective_id === oldObjective.objective_id
      && obj.alignment_of
      && obj.alignment_of.objective_id === oldObjective.alignment_of.objective_id);
    let objective = oldObjective;
    while (objective && objective.objective_id !== oldObjective.alignment_of.objective_id) {
      [objective] = objective.key_results;
    }
    objective.alignment_of = null;
    objective.root_objective = false;
    objective.parent_objective_id = null;
    dataListClone.splice(index, 1, objective);
    return dataListClone;
  },

  replaceObjectiveInList: (objectives, updatedObjective, index) => {
    const dataListClone = appUtils.clone(objectives, []);
    dataListClone.splice(index, 1, updatedObjective);
    return dataListClone;
  },

  collapseObjectives: (dataList) => {
    return dataList.map(objective => {
      const tempObj = objective;
      tempObj.isOpen = false;
      return tempObj;
    });
  },

  isListContainsData: (dataList, key, value) => {
    return dataList && dataList.findIndex(item => item[key] === value) > -1;
  },
  listDataIndex: (dataList, key, value) => {
    return dataList ? dataList.findIndex(item => item[key] === value) : -1;
  },

  removeDuplicates: (dataList, key) => {
    return dataList.filter((obj, pos, arr) => {
      return arr.map(mObj => mObj[key]).indexOf(obj[key]) === pos;
    });
  },

  deleteFromList: (list, key, value) => {
    return list.filter(obj => obj[key] !== value);
  },

  capitalizeString: (str) => {
    if (str == null || str.trim().length === 0)
      return str;
    return str[0].toUpperCase() + str.slice(1);
  },

  createMarkupString: (text) => {
    let temp = text;
    // eslint-disable-next-line no-useless-escape
    const urlRegex = /(http:\/\/www\.|https:\/\/|www\.|http:\/\/|https:\/\/)\b(?:[a-z\d])(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/g;
    if (text.match(urlRegex)) {
      temp = text.replace(urlRegex, (url) => {
        let tempUrl = url;
        if (!url.includes('http')) {
          tempUrl = `http://${url}`
        }
        return `<a href="${tempUrl}" target="_blank">${url}</a>`;
      });
    }
    return temp.replace(/\r?\n/g, '<br />');
  },

  convertMentionsToString: (value) => {
    let tempMessage = value;
    // eslint-disable-next-line no-useless-escape
    if (value.match(/(\/\/\~\[)/g)) {
      const obj = {};
      let lastIndexOfMention = 0;
      let startIndexOfName = '';
      let endIndexOfName = '';
      let startIndexOfId = '';
      let endIndexOfId = '';

      // eslint-disable-next-line no-useless-escape
      const count = value.match(/(\/\/\~\[)/g).length;

      if (count > 0) {
        for (let i = 0; i < count; i += 1) {
          startIndexOfName = value.indexOf('//~[', lastIndexOfMention) + 4;
          endIndexOfName = value.indexOf('](', startIndexOfName);

          startIndexOfId = value.indexOf('](', endIndexOfName) + 2;
          endIndexOfId = value.indexOf(')~//', startIndexOfId);

          obj.name = value.slice(startIndexOfName, endIndexOfName);
          obj.id = value.slice(startIndexOfId, endIndexOfId);

          lastIndexOfMention = endIndexOfId;

          tempMessage = tempMessage.replace(`//~[${obj.name}](${obj.id})~//`, `//~${obj.id}~//`);
        }
      }
    }
    return tempMessage;
  },

  convertStringToMentions: (data) => {
    let tempMessage = data.message;
    // eslint-disable-next-line no-useless-escape
    const count = data && data.message && data.message.match(/(\/\/\~)/g) && data.message.match(/(\/\/\~)/g).length;
    if (count > 0) {
      for (let i = 0; i < count; i += 1) {
        const listOfKeys = Object.keys(data.tagged_users);
        for (let j = 0; j < listOfKeys.length; j += 1) {
          if (data.tagged_users && data.tagged_users[listOfKeys[j]] && data.tagged_users[listOfKeys[j]].name) {
            tempMessage = tempMessage.replace(`//~${listOfKeys[j]}~//`, `<span class='userMentions'>@${data.tagged_users[listOfKeys[j]].name}</span>`)
          }
        }
      }
    }
    return tempMessage;
  },

 

 

  getValueFromQueryParam: (key) => {
    return queryString.parse(window.location.search)[key];
  },

  convertHexToRGBA: function convertHexToRGBA(hex, opacity) {
    let h = hex.replace('#', '');
    h = h.match(new RegExp(`(.{${h.length / 3}})`, 'g'));
    for (let i = 0; i < h.length; i += 1)
      h[i] = parseInt(h[i].length === 1 ? h[i] + h[i] : h[i], 16);
    if (typeof opacity !== 'undefined') h.push(opacity);
    return `rgba(${h.join(',')})`;
  },

  getActiveObjectiveCycleIndex: (objectiveCycles, selectedObjCycleId) => {
    let activeObjectiveCycleIndex = -1;
    for (let i = 0; i <= objectiveCycles.length; i += 1) {
      // Find default activeObjectiveCycleIndex
      if (objectiveCycles[i] && objectiveCycles[i].status === 'ACTIVE' && activeObjectiveCycleIndex === -1) {
        activeObjectiveCycleIndex = i;

        // If selectedObjCycleId is null or empty break loop
        if (selectedObjCycleId == null) {
          return i;
        }
      }

      // If selectedObjCycleId is not null, find it in objectiveCycles
      if (objectiveCycles[i] && selectedObjCycleId) {

        // If selectedObjCycleId matches objectiveCycles.id its a activeObjectiveCycleIndex
        if (selectedObjCycleId === objectiveCycles[i].id) {
          return i;
        }
      }
    }
    return activeObjectiveCycleIndex !== -1 ? activeObjectiveCycleIndex : 0;
  },

  getSelectedTag: (tags, selectedTagId) => {
    if (selectedTagId) {
      if (selectedTagId === HeaderLeftTabs[1].tag_id) {
        return HeaderLeftTabs[1];
      }
      for (let i = 0; i <= tags.length; i += 1) {
        if (tags[i] && selectedTagId === tags[i].tag_id) {
          return tags[i];
        }
      }
    }
    return HeaderLeftTabs[0];
  },

  isHeaderLeftTabs: (tag_id) => {
    return tag_id == null ||
      tag_id === HeaderLeftTabs[0].tag_id ||
      tag_id === HeaderLeftTabs[1].tag_id;
  },

  isEmptyString: str => {
    return str == null || _isEmpty(str.toString().trim());
  },

  isNotEmptyString: str => {
    return !appUtils.isEmptyString(str);
  },

  isEmail: str => {
    return appUtils.isNotEmptyString(str) && _isEmail(str);
  },

  getNameFromEmail: str => {
    if (str == null)
      return str;
    return appUtils.capitalizeString(str.toString().trim().split('@')[0].split('.')[0].split('_')[0]);
  },

  isURL: str => {
    return appUtils.isNotEmptyString(str) && _isURL(str);
  },

  isNumeric: str => {
    return appUtils.isNotEmptyString(str) && _isNumeric(str);
  },

  validatePassword: password => {
    if (password.length < 6) {
      return ErrorMsg.PASSWORD_LENGTH_ERROR;
    }
    if (password.length >= 6) {
      return true;
    }
    const lowercaseRegex = new RegExp('(?=.*[a-z])');
    const uppercaseRegex = new RegExp('(?=.*[A-Z])');
    const numericRegex = new RegExp('(?=.*[0-9])');
    const specialCharacterRegex = new RegExp("[!@_#$%^&*(),.?':{}|<>]");

    if (!lowercaseRegex.test(password)) {
      return ErrorMsg.LOWERCASE_PASSWORD;
    }
    if (!uppercaseRegex.test(password)) {
      return ErrorMsg.UPPERCASE_PASSWORD;
    }
    if (!specialCharacterRegex.test(password)) {
      return ErrorMsg.SPECIAL_CHARACTER;
    }
    if (!numericRegex.test(password)) {
      return ErrorMsg.NUMERIC_PASSWORD;
    }
    return true;
  },

  convertTimeToString: (timestamp, conversionType = DateConversionType.HOUR_AND_DATE) => {
    const timestampDate = new Date(timestamp);
    const currentDate = new Date();

    // get seconds
    const seconds = Math.abs(currentDate - timestampDate) / 1000;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const completeCurrentDate = `${currentDate.getDate()} / ${currentDate.getMonth() + 1} / ${currentDate.getFullYear()}`;
    const completeTimeStampDate = `${timestampDate.getDate()} / ${timestampDate.getMonth() + 1} / ${timestampDate.getFullYear()}`;
    if (conversionType === DateConversionType.HOUR_AND_DATE) {
      if (hours < 24 && (completeCurrentDate === completeTimeStampDate)){
        return `at ${moment(timestamp).format('h:mm a')}`;
      }
      if (hours > 24 && hours < 48){
        return 'yesterday';
      }
      if(hours > 48 && (currentDate.getDate() - timestampDate.getDate()) === 2){
        return moment(`${timestampDate.getFullYear()}${timestampDate.getMonth() + 1}${timestampDate.getDate()}`, 'YYYYMMDD').fromNow();
      }
      return `on ${moment(timestamp).format('Do MMM')}`;
    }
    return moment(timestamp).fromNow();
  },

  mapGoogleUserToResponse: (res) => {
    const authResponse = res.getAuthResponse();
    const basicProfile = res.getBasicProfile();
    res.googleId = basicProfile.getId();
    res.tokenObj = authResponse;
    res.tokenId = authResponse.id_token;
    res.accessToken = authResponse.access_token;
    res.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName()
    };
    return res;
  },

};

export default appUtils;

export const delay = (millisecond) => {
  return appUtils.delay(millisecond);
};

export const clone = (data, type = {}, shallow = true) => {
  return appUtils.clone(data, type, shallow);
};

export const merge = (target, ...sources) => {
  return appUtils.merge(target, sources);
};

export const hasProperty = (obj, property) => {
  return appUtils.hasProperty(obj, property);
};

export const filterList = (dataList, key, filterKeyword = '') => {
  return appUtils.filterList(dataList, key, filterKeyword);
};

export const deleteFromList = (dataList, attribute, keyword) => {
  return appUtils.deleteFromList(dataList, attribute, keyword);
};

export const compareValues = (key, order) => {
  return appUtils.compareValues(key, order);
};

export const removeDuplicates = (dataList, key) => {
  return appUtils.removeDuplicates(dataList, key);
};

export const dataURItoBlob = (dataURI) => {
  return appUtils.dataURItoBlob(dataURI);
};

export const compareLists = (dataList1, dataList2, key) => {
  return appUtils.compareLists(dataList1, dataList2, key);
};

export const capitalizeString = (str) => {
  return appUtils.capitalizeString(str);
};

export const createMarkupString = (text) => {
  return appUtils.createMarkupString(text);
};

export const convertMentionsToString = (value) => {
  return appUtils.convertMentionsToString(value);
};

export const convertStringToMentions = (data) => {
  return appUtils.convertStringToMentions(data);
};

export const overwriteDataInList = (dataList, key, data) => {
  return appUtils.overwriteDataInList(dataList, key, data);
};

export const addKRUsingContext = (dataList, data, context) => {
  return appUtils.addKRUsingContext(dataList, data, context);
};

export const updateObjectiveUsingContext = (dataList, objective, context) => {
  return appUtils.updateObjectiveUsingContext(dataList, objective, context);
};

export const updatePathMap = (objective, pathMap, basePath) => {
  return appUtils.updatePathMap(objective, pathMap, basePath);
};

export const createPathMap = (dataList) => {
  return appUtils.createPathMap(dataList);
};

export const updateObjectiveOpenStateUsingContext = (dataList, objective, state, pathMap) => {
  return appUtils.updateObjectiveOpenStateUsingContext(dataList, objective, state, pathMap);
};

export const replaceObjectiveInList = (dataList, data, objective) => {
  return appUtils.replaceObjectiveInList(dataList, data, objective);
};

export const collapseObjectives = (dataList) => {
  return appUtils.collapseObjectives(dataList);
}

export const getUpdatedAlignmentTree = (data, objective) => {
  return appUtils.getUpdatedAlignmentTree(data, objective);
};

export const replaceObjectiveAlignment = (data, oldObjective) => {
  return appUtils.replaceObjectiveAlignment(data, oldObjective);
}

export const canPerformActions = (objective, user) => {
  return appUtils.canPerformActions(objective, user);
};

export const isListContainsData = (dataList, key, value) => {
  return appUtils.isListContainsData(dataList, key, value);
};

export const listDataIndex = (dataList, key, value) => {
  return appUtils.listDataIndex(dataList, key, value);
};

export const shouldRestrictActions = (objective, user) => {
  return appUtils.shouldRestrictActions(objective, user);
};

export const getValueFromQueryParam = (key) => {
  return appUtils.getValueFromQueryParam(key);
};

export const convertHexToRGBA = (hex, opacity) => {
  return appUtils.convertHexToRGBA(hex, opacity);
};

export const getActiveObjectiveCycleIndex = (objectiveCycles, selectedObjCycleId) => {
  return appUtils.getActiveObjectiveCycleIndex(objectiveCycles, selectedObjCycleId);
};

export const getSelectedTag = (tags, selectedTagId) => {
  return appUtils.getSelectedTag(tags, selectedTagId);
};

export const isHeaderLeftTabs = (tag_id) => {
  return appUtils.isHeaderLeftTabs(tag_id);
};

export const validatePassword = password => {
  return appUtils.validatePassword(password);
};

export const isEmptyString = str => {
  return appUtils.isEmptyString(str);
};

export const isNotEmptyString = str => {
  return appUtils.isNotEmptyString(str);
};

export const isEmail = str => {
  return appUtils.isEmail(str);
};

export const getNameFromEmail = str => {
  return appUtils.getNameFromEmail(str);
};

export const isURL = str => {
  return appUtils.isURL(str);
};

export const isNumeric = str => {
  return appUtils.isNumeric(str);
};

export const convertTimeToString = (timestamp, conversionType) => {
  return appUtils.convertTimeToString(timestamp, conversionType);
};

export const createQueryString = (...queries) => {
  const parsed = queryString.parse(window.location.search);
  for (let i = 0; i < queries.length; i += 1) {
    const query = queries[i];
    parsed[query.key] = query.value ? query.value : undefined;
  }
  return queryString.stringify(parsed);
};


export const mapGoogleUserToResponse = (res) => {
  return appUtils.mapGoogleUserToResponse(res);
};


