const countryList = [
  {
    name: 'Afghanistan',
    code: '93',
    icon: '🇦🇫',
  },
  {
    name: 'Australia',
    code: '61',
    icon: '🇦🇺',
  },
  {
    name: 'Bahrain',
    code: '973',
    icon: '🇧🇭',
  },
  {
    name: 'Bangladesh',
    code: '880',
    icon: '🇧🇩',
  },
  {
    name: 'Bhutan',
    code: '975',
    icon: '🇧🇹',
  },
  {
    name: 'Brazil',
    code: '55',
    icon: '🇧🇷',
  },
  {
    name: 'Cambodia',
    code: '855',
    icon: '🇰🇭',
  },
  {
    name: 'Canada',
    code: '1',
    icon: '🇨🇦',
  },
  //   {
  //     name: 'Cayman Islands',
  //     code: '1-345',
  //     icon: '🇰🇾',
  //   },
  {
    name: 'Central African Republic',
    code: '236',
    icon: '🇨🇫',
  },
  {
    name: 'Chad',
    code: '235',
    icon: '🇹🇩',
  },
  {
    name: 'China',
    code: '86',
    icon: '🇨🇳',
  },
  {
    name: 'Colombia',
    code: '57',
    icon: '🇨🇴',
  },
  {
    name: 'Cook Islands',
    code: '682',
    icon: '🇨🇰',
  },
  {
    name: 'Falkland Islands',
    code: '500',
    icon: '	🇫🇰',
  },
  {
    name: 'Egypt',
    code: '20',
    icon: '🇪🇬',
  },
  {
    name: 'Ethiopia',
    code: '250',
    icon: '🇪🇹',
  },
  {
    name: 'Ghana',
    code: '233',
    icon: '🇬🇭',
  },
  {
    name: 'Hong Kong',
    code: '852',
    icon: '🇭🇰',
  },
  {
    name: 'India',
    code: '91',
    icon: '🇮🇳',
  },
  {
    name: 'Indonesia',
    code: '62',
    icon: '🇮🇩',
  },
  {
    name: 'Malaysia',
    code: '60',
    icon: '🇲🇾',
  },
  {
    name: 'Mauritius',
    code: '230',
    icon: '🇲🇺',
  },
  //   {
  //     name: 'Montserrat',
  //     code: '1-664',
  //     icon: '🇲🇸',
  //   },
  {
    name: 'Mozambique',
    code: '258',
    icon: '🇲🇿',
  },
  {
    name: 'Myanmar',
    code: '95',
    icon: '🇲🇲',
  },
  {
    name: 'Nepal',
    code: '977',
    icon: '🇳🇵',
  },
  {
    name: 'Netherlands',
    code: '31',
    icon: '🇳🇱',
  },
  {
    name: 'Niger',
    code: '227',
    icon: '🇳🇪',
  },
  {
    name: 'Nigeria',
    code: '234',
    icon: '🇳🇬',
  },
  {
    name: 'Oman',
    code: '868',
    icon: '🇴🇲',
  },
  {
    name: 'Pakistan',
    code: '92',
    icon: '🇵🇰',
  },
  {
    name: 'Palestine',
    code: '970',
    icon: '🇵🇸',
  },
  {
    name: 'Papua New Guinea',
    code: '675',
    icon: '🇵🇬',
  },
  {
    name: 'Philippines',
    code: '63',
    icon: '🇵🇭',
  },
  {
    name: 'Pitcairn',
    code: '870',
    icon: '🇵🇳',
  },
  {
    name: 'Portugal',
    code: '48',
    icon: '🇵🇹',
  },
  {
    name: 'Qatar',
    code: '974',
    icon: '🇶🇦',
  },
  {
    name: 'Republic Of The Congo',
    code: '242',
    icon: '🇨🇩',
  },
  {
    name: 'Rwanda',
    code: '250',
    icon: '🇷🇼',
  },
  {
    name: 'Samoa',
    code: '685',
    icon: '🇼🇸',
  },
  {
    name: 'Saudi Arabia',
    code: '966',
    icon: '🇸🇦',
  },
  {
    name: 'Singapore',
    code: '65',
    icon: '🇸🇬',
  },
  {
    name: 'Somalia',
    code: '252',
    icon: '🇸🇴',
  },
  {
    name: 'South Africa',
    code: '27',
    icon: '🇿🇦',
  },
  {
    name: 'South Korea',
    code: '82',
    icon: '🇰🇷',
  },
  {
    name: 'South Sudan',
    code: '211',
    icon: '🇸🇸',
  },
  {
    name: 'Sri Lanka',
    code: '94',
    icon: '🇱🇰',
  },
  {
    name: 'Sudan',
    code: '249',
    icon: '🇸🇩',
  },
  {
    name: 'Syria',
    code: '963',
    icon: '🇸🇾',
  },
  {
    name: 'Taiwan',
    code: '886',
    icon: '🇹🇼',
  },
  {
    name: 'Tanzania',
    code: '255',
    icon: '🇹🇿',
  },
  {
    name: 'Thailand',
    code: '66',
    icon: '🇹🇭',
  },
  {
    name: 'Tunisia',
    code: '216',
    icon: '🇹🇳',
  },
  {
    name: 'Turkey',
    code: '90',
    icon: '🇹🇷',
  },
  //   {
  //     name: 'Turks And Caicos Islands',
  //     code: '1-649',
  //     icon: '🇹🇨',
  //   },
  {
    name: 'Uganda',
    code: '256',
    icon: '🇺🇬',
  },
  {
    name: 'Ukraine',
    code: '380',
    icon: '🇺🇦',
  },
  {
    name: 'United Arab Emirates',
    code: '971',
    icon: '🇦🇪',
  },
  {
    name: 'United Kingdom',
    code: '44',
    icon: '🇬🇧',
  },
  //   {
  //     name: 'United States',
  //     code: '1',
  //     icon: '🇺🇸',
  //   },
  {
    name: 'Uruguay',
    code: '598',
    icon: '🇺🇾',
  },
  {
    name: 'Venezuela',
    code: '58',
    icon: '🇻🇪',
  },
  {
    name: 'Vietnam',
    code: '84',
    icon: '🇻🇳',
  },
  {
    name: 'Yemen',
    code: '967',
    icon: '🇾🇪',
  },
  {
    name: 'Zambia',
    code: '260',
    icon: '🇿🇲',
  },
  {
    name: 'Zimbabwe',
    code: '263',
    icon: '🇿🇼',
  },
]

export default countryList
