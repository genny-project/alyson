export const personalDetails = {
  header: 'Personal Details',
  attributes: [
    { label: 'First Name:', attr: 'PRI_FIRSTNAME' },
    { label: 'Last Name:', attr: 'PRI_LASTNAME' },
    // { label: 'Email:', attr: 'PRI_EMAIL' },
    // { label: 'Mobile:', attr: 'PRI_MOBILE' },
  ],
}

export const professionalDetails = {
  header: 'Professional Details',
  attributes: [
    { label: 'LinkedIn:', attr: 'PRI_LINKEDIN_PROFILE_URL' },
    { label: 'Name of the Club:', attr: '_LNK_MENTOR_CLUB__PRI_NAME' },
    { label: 'Hobbies', attr: '_LNK_HOBBIES_INTEREST__PRI_NAME' },
  ],
}

export const preference = {
  header: 'What I Offer your from the internship',
  attributes: [{ attr: '_LNK_OUTPUTS_OF_MENTORING_PROGRAM__PRI_NAME' }],
}

export const menteeProfessionalDetails = {
  header: 'Professional Details',
  attributes: [
    { label: 'LinkedIn:', attr: 'PRI_LINKEDIN_PROFILE_URL' },
    { label: 'Hobbies', attr: '_LNK_HOBBIES_INTEREST__PRI_NAME' },
  ],
}

export const menteePreference = {
  header: 'What I am interested from the mentorship',
  attributes: [{ attr: '_LNK_OUTPUTS_OF_MENTORING_PROGRAM__PRI_NAME' }],
}

export const recommendationDetails = [
  {
    label: 'Location:',
    attribute: '_LNK_SELECT_ORIGIN_COUNTRY__PRI_NAME',
  },
  {
    label: 'Gender:',
    attribute: '_LNK_GENDER_SELECT__PRI_NAME',
  },
  {
    label: 'Country of Origin:',
    attribute: '_LNK_SELECT_ORIGIN_COUNTRY__PRI_NAME',
  },
  {
    label: 'Industry:',
    attribute: '_LNK_MM_INDUSTRY__PRI_NAME',
  },
  {
    label: 'Mentor Experience:',
    attribute: '_LNK_MENTOR_PREV_EXP__PRI_NAME',
  },
]

export const inviteeDetails = [
  {
    label: 'Country of Origin:',
    attribute: '_LNK_MENTEE__LNK_SELECT_ORIGIN_COUNTRY__PRI_NAME',
  },
  {
    label: 'Industry:',
    attribute: '_LNK_MENTEE__LNK_MM_INDUSTRY__PRI_NAME',
  },
  {
    label: 'Hobbies:',
    attribute: '_LNK_MENTEE__LNK_HOBBIES_INTEREST__PRI_NAME',
  },
]

export const menteeInviteePersonalDetails = {
  header: 'Personal Details',
  attributes: [
    { label: 'First Name:', attr: '_LNK_MENTEE__PRI_FIRSTNAME' },
    { label: 'Last Name:', attr: '_LNK_MENTEE__PRI_LASTNAME' },
    { label: 'Gender:', attr: '_LNK_MENTEE__PRI_GENDER' },
  ],
}

export const menteeInviteeProfessionalDetails = {
  header: 'Professional Details',
  attributes: [
    { label: 'LinkedIn:', attr: '_LNK_MENTEE__PRI_LINKEDIN_PROFILE_URL' },
    { label: 'Hobbies', attr: '_LNK_MENTEE__LNK_HOBBIES_INTEREST__PRI_NAME' },
  ],
}

export const menteeInviteePreference = {
  header: 'What I am interested from the mentorship',
  attributes: [{ attr: '_LNK_MENTEE__LNK_OUTPUTS_OF_MENTORING_PROGRAM__PRI_NAME' }],
}

export const menteeInfo = {
  attributes: [
    { label: 'First Name:', attr: '_LNK_MENTEE__PRI_FIRSTNAME' },
    { label: 'Last Name', attr: '_LNK_MENTEE__PRI_LASTNAME' },
    { label: 'Country of Origin', attr: '_LNK_MENTEE__LNK_SELECT_ORIGIN_COUNTRY__PRI_NAME' },
    { label: 'Industry', attr: '_LNK_MENTEE__LNK_MM_INDUSTRY__PRI_NAME' },
    { label: 'Hobbies', attr: '_LNK_MENTEE__LNK_HOBBIES_INTEREST__PRI_NAME' },
  ],
}

export const mentorInfo = {
  attributes: [
    { label: 'First Name:', attr: '_LNK_MENTOR__PRI_FIRSTNAME' },
    { label: 'Last Name', attr: '_LNK_MENTOR__PRI_LASTNAME' },
    { label: 'Country of Origin', attr: '_LNK_MENTOR__LNK_SELECT_ORIGIN_COUNTRY__PRI_NAME' },
    { label: 'Industry', attr: '_LNK_MENTOR__LNK_MM_INDUSTRY__PRI_NAME' },
    { label: 'Hobbies', attr: '_LNK_MENTOR__LNK_HOBBIES_INTEREST__PRI_NAME' },
  ],
}
