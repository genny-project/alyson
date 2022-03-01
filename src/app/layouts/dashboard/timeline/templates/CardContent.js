export const personalDetails = {
  header: 'Personal Details',
  attributes: [
    { label: 'First Name:', attr: 'PRI_FIRSTNAME' },
    { label: 'Last Name:', attr: 'PRI_LASTNAME' },
    { label: 'Email:', attr: 'PRI_EMAIL' },
    { label: 'Mobile:', attr: 'PRI_MOBILE' },
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
  header: 'What I Offer your frome the internship',
  attributes: [{ attr: '_LNK_OUTPUTS_OF_MENTORING_PROGRAM__PRI_NAME' }],
}

export const recommendationDetails = [
  {
    label: 'Location:',
    attribute: '_LNK_SELECT_COUNTRY__PRI_NAME',
  },
  {
    label: 'Gender:',
    attribute: 'PRI_GENDER',
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
