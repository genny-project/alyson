export const personalDetails = {
  header: 'Personal Details',
  attributes: [
    { label: 'First Name:', attr: 'PRI_FIRSTNAME' },
    { label: 'Last Name:', attr: 'PRI_LASTNAME' },
    { label: 'Email:', attr: 'PRI_EMAIL' },
    { label: 'Mobile:', attr: 'PRI_MOBILE' },
    { label: 'Ethnicity Background:', attr: 'PRI_ETH_BACK' },
  ],
}

export const professionalDetails = {
  header: 'Professional Details',
  attributes: [
    { label: 'Area of Expertise:', attr: 'PRI_AREA_EXPERTISE' },
    { label: 'Status:', attr: 'PRI_STATUS' },
    { label: 'Training Status:', attr: 'PRI_TRAINING_STATUS' },
    { label: 'LinkedIn:', attr: 'PRI_LINKEDIN_PROFILE_URL' },
  ],
}

export const preference = {
  header: 'What I Enjoy',
  attributes: [{ attr: 'LNK_HOBBIES_INTEREST' }],
}

export const recommendationDetails = [
  {
    label: 'Location:',
    attribute: 'PRI_MENTOR_LOC_PREF',
  },
  {
    label: 'Gender:',
    attribute: 'PRI_MENTOR_GENDER',
  },
  {
    label: 'Country:',
    attribute: 'PRI_SELECT_COUNTRY',
  },
  {
    label: 'Expertise:',
    attribute: 'PRI_OUTPUTS_OF_MENTORING_PROGRAM',
  },
  {
    label: 'Industry:',
    attribute: 'PRI_INDUSTRY',
  },
  {
    label: 'Rotary Member?',
    attribute: 'PRI_NAME',
  },
]
