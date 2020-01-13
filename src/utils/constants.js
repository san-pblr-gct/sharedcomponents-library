export const ErrorMsg = {
  INVALID_EMAIL: 'Invalid email!',
  LOWERCASE_PASSWORD: 'The password must contain at least 1 lowercase alphabetical character',
  UPPERCASE_PASSWORD: 'The password must contain at least 1 uppercase alphabetical character',
  NUMERIC_PASSWORD: 'The password must contain at least 1 numeric character',
  SPECIAL_CHARACTER: 'The password must contain at least one special character',
  WRONG_EMAIL: 'Your email might be wrong',
  PASSWORD_LENGTH_ERROR: 'Password should be atleast 6 characters long',
  EMPTY_NAME: 'Name cannot be empty',
  EMPTY_VERIFICATIONCODE: 'Verification Code cannot be empty',
};

export const SubscribeStatus = {
  FOLLOW: 'Follow',
  UNFOLLOW: 'Unfollow',
};

export const ObjectiveActionTypes = {
  CHECK_IN: 'CHECK-IN',
  COMMENT: 'COMMENT',
  CHANGE_QUARTER: 'CHANGE_QUARTER'
};

export const PasswordLength = '6';

export const ActivityType = {
  CREATE_OBJECTIVE: 'CREATE_OBJECTIVE',
  OBJECTIVE_COMMENT: 'OBJECTIVE_COMMENT',
  OBJECTIVE_TYPE: 'OBJECTIVE_TYPE',
  OBJECTIVE_DESCRIPTION: 'OBJECTIVE_DESCRIPTION',
  OBJECTIVE_COMPLETION_STATUS: 'OBJECTIVE_COMPLETION_STATUS',
  OBJECTIVE_TITLE: 'OBJECTIVE_TITLE',
  OBJECTIVE_OKR_CYCLE: 'OBJECTIVE_OKR_CYCLE',
  OBJECTIVE_OWNER: 'OBJECTIVE_OWNER',
  OBJECTIVE_CHECK_IN: 'OBJECTIVE_CHECKIN',
  OBJECTIVE_PROGRESS: 'OBJECTIVE_PROGRESS',
  OBJECTIVE_STATUS: 'OBJECTIVE_STATUS',
  ADD_OBJECTIVE_TAGS: 'ADD_OBJECTIVE_TAGS',
  REMOVE_OBJECTIVE_TAGS: 'REMOVE_OBJECTIVE_TAGS',
  OBJECTIVE_PARENT_DELETED: 'OBJECTIVE_PARENT_DELETED',
  OBJECTIVE_TYPE_AFTER_PARENT_DELETION: 'OBJECTIVE_TYPE_AFTER_PARENT_DELETION',
};

export const ActivityTypeValue = {
  NEEDS_WORK: 'Needs Work',
  NOT_STARTED: 'Not Started',
  NEGOTIATION: 'Negotiation',
  OFF_TRACK: 'Off Track',
  REJECTED: 'rejected',
  ACCEPTED: 'Accepted',
  ON_TRACK: 'On Track',
  ACHIEVED: 'Achieved',
  DROPPED: 'Dropped',
  COMPANY: 'Company Objective',
  NON_ALIGNED: 'Non Aligned',
};

export const ObjectiveCycleStatus = {
  EXPIRED: 'EXPIRED',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

export const UserStatus = {
  REVOKED: 'REVOKED',
  INVALID: 'INVALID',
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
};

export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const ActionKey = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const StorageKey = {
  ORG_NAME: 'ORG_NAME',
  ORG_ID: 'ORG_ID',
  ORG_INFO: 'ORG_INFO',
  SUB_DOMAIN: 'SUB_DOMAIN',
  USER_INFO: 'USER_INFO',
  PRODUCT_ID: 'PRODUCT_ID',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REQUESTER_USER_ID: 'REQUESTER_USER_ID',
  IS_GOOGLED_SIGNED:'IS_GOOGLED_SIGNED',
};

export const ObjectiveStatus = {
  NEEDS_WORK: 'NEEDS_WORK',
  NOT_STARTED: 'NOT_STARTED',
  NEGOTIATION: 'NEGOTIATION',
  OFF_TRACK: 'OFF_TRACK',
  REJECTED: 'REJECTED',
  ACCEPTED: 'ACCEPTED',
  ON_TRACK: 'ON_TRACK',
  ACHIEVED: 'ACHIEVED',
  DROPPED: 'DROPPED',
  COMPANY: 'COMPANY',
  NON_ALIGNED: 'NON_ALIGNED',
};

export const FilterProgressTypes = [{
  name: 'NOT STARTED',
  id: ObjectiveStatus.NOT_STARTED,
}, {
  name: 'OFF TRACK',
  id: ObjectiveStatus.OFF_TRACK,
}, {
  name: 'NEEDS WORK',
  id: ObjectiveStatus.NEEDS_WORK,
}, {
  name: 'ON TRACK',
  id: ObjectiveStatus.ON_TRACK,
}, {
  name: ObjectiveStatus.ACHIEVED,
  id: ObjectiveStatus.ACHIEVED,
}, {
  name: ObjectiveStatus.DROPPED,
  id: ObjectiveStatus.DROPPED,
}];

export const FilterObjectiveTypes = [{
  name: 'Company Objective',
  id: 'COMPANY',
}, {
  name: 'Non-aligned Objective',
  id: 'NON_ALIGNED',
}];

export const QueryParam = {
  OBJECTIVE_CYCLE: 'oc',
  SELECTED_TAG: 'tm',
  SELECTED_OBJECTIVE: 'ob',
};

export const HeaderLeftTabs = [{
  label: 'My Objectives',
  tag_id: '8b97e974-13c6-4c71-b225-6c9d52ac3100',
},
{
  label: 'All Objectives',
  tag_id: '0c5ac74d-394f-420f-8932-5d10a71d9a78',
}];

export const HeaderMenus = [
  {
    path: 'settings',
    text: 'Account',
    icon: 'person'
  },
  {
    path: 'people',
    text: 'People',
    icon: 'twoPeople'
  },
];

export const ObjectiveActions = [
  {
    text: 'View Details',
    type: 'text',
    id: 'view',
  },
  {
    text: 'Comment',
    type: 'text',
    id: 'comment',
  },
  // Note: can use this option later
  // {
  //   text: 'Change Quarter',
  //   type: 'text',
  //   id: 'change_quarter',
  // },
  {
    text: 'Delete',
    type: 'text',
    id: 'delete',
    color: '#df2e2e',
  }
];

export const ActiveMemberAdminActions = [
  {
    text: 'Make Workspace Admin',
    type: 'text',
    id: 'change_role',
  },
  {
    text: 'Remove User',
    type: 'text',
    id: 'delete_user',
  }
];

export const RemoveAdminUserActions = [
  {
    text: 'Remove Admin Rights',
    type: 'text',
    id: 'change_role',
  },
  {
    text: 'Remove User',
    type: 'text',
    id: 'delete_user',
  }
];

export const PendingMemberAdminActions = [
  {
    text: 'Make Admin',
    type: 'text',
    id: 'change_role',
  },
  {
    text: 'Reinvite',
    type: 'text',
    id: 'reinvite',
  },
  {
    text: 'Revoke Invitation',
    type: 'text',
    id: 'revoke_invitation',
  }
];

export const PendingMemberRemoveAdminUserActions = [
  {
    text: 'Remove Admin Rights',
    type: 'text',
    id: 'change_role',
  },
  {
    text: 'Reinvite',
    type: 'text',
    id: 'reinvite',
  },
  {
    text: 'Revoke Invitation',
    type: 'text',
    id: 'revoke_invitation',
  }
];

export const DateConversionType = {
  HOUR_AND_DATE: 'HOUR_AND_DATE',
  TIME_AGO: 'TIME_AGO',
  DATE_AND_YEAR: 'DATE_AND_YEAR'
};