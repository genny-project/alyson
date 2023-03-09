const countryList = [
  {
    code: '+93',
    name: 'Afghanistan',
    icon: '🇦🇫',
  },
  {
    code: '+355',
    name: 'Albania',
    icon: '🇦🇱',
  },
  {
    code: '+213',
    name: 'Algeria',
    icon: '🇩🇿',
  },
  {
    code: '+1-684',
    name: 'American Samoa',
    icon: '🇦🇸',
  },
  {
    code: '+376',
    name: 'Andorra',
    icon: '🇦🇩',
  },
  {
    code: '+244',
    name: 'Angola',
    icon: '🇦🇴',
  },
  {
    code: '+1-264',
    name: 'Anguilla',
    icon: '🇦🇮',
  },
  {
    code: '+672',
    name: 'Antarctica',
    icon: '🇦🇶',
  },
  {
    code: '+1-268',
    name: 'Antigua and Barbuda',
    icon: '🇦🇬',
  },
  {
    code: '+54',
    name: 'Argentina',
    icon: '🇦🇷',
  },
  {
    code: '+374',
    name: 'Armenia',
    icon: '🇦🇲',
  },
  {
    code: '+297',
    name: 'Aruba',
    icon: '🇦🇼',
  },
  {
    code: '+61',
    name: 'Australia',
    icon: '🇦🇺',
  },
  {
    code: '+43',
    name: 'Austria',
    icon: '🇦🇹',
  },
  {
    code: '+994',
    name: 'Azerbaijan',
    icon: '🇦🇿',
  },
  {
    code: '+1-242',
    name: 'Bahamas',
    icon: '🇧🇸',
  },
  {
    code: '+973',
    name: 'Bahrain',
    icon: '🇧🇭',
  },
  {
    code: '+880',
    name: 'Bangladesh',
    icon: '🇧🇩',
  },
  {
    code: '+1-246',
    name: 'Barbados',
    icon: '🇧🇧',
  },
  {
    code: '+375',
    name: 'Belarus',
    icon: '🇧🇾',
  },
  {
    code: '+32',
    name: 'Belgium',
    icon: '🇧🇪',
  },
  {
    code: '+501',
    name: 'Belize',
    icon: '🇧🇿',
  },
  {
    code: '+229',
    name: 'Benin',
    icon: '🇧🇯',
  },
  {
    code: '+1-441',
    name: 'Bermuda',
    icon: '🇧🇲',
  },
  {
    code: '+975',
    name: 'Bhutan',
    icon: '🇧🇹',
  },
  {
    code: '+591',
    name: 'Bolivia',
    icon: '🇧🇴',
  },
  {
    code: '+387',
    name: 'Bosnia and Herzegovina',
    icon: '🇧🇦',
  },
  {
    code: '+267',
    name: 'Botswana',
    icon: '🇧🇼',
  },
  {
    code: '+55',
    name: 'Brazil',
    icon: '🇧🇷',
  },
  {
    code: '+246',
    name: 'British Indian Ocean Territory',
    icon: '🇮🇴',
  },
  {
    code: '+1-284',
    name: 'British Virgin Islands',
    icon: '🇻🇬',
  },
  {
    code: '+673',
    name: 'Brunei',
    icon: '🇧🇳',
  },
  {
    code: '+359',
    name: 'Bulgaria',
    icon: '🇧🇬',
  },
  {
    code: '+226',
    name: 'Burkina Faso',
    icon: '🇧🇫',
  },
  {
    code: '+257',
    name: 'Burundi',
    icon: '🇧🇮',
  },
  {
    code: '+855',
    name: 'Cambodia',
    icon: '🇰🇭',
  },
  {
    code: '+237',
    name: 'Cameroon',
    icon: '🇨🇲',
  },
  {
    code: '+1',
    name: 'Canada',
    icon: '🇨🇦',
  },
  {
    code: '+238',
    name: 'Cape Verde',
    icon: '🇨🇻',
  },
  {
    code: '+1-345',
    name: 'Cayman Islands',
    icon: '🇰🇾',
  },
  {
    code: '+236',
    name: 'Central African Republic',
    icon: '🇨🇫',
  },
  {
    code: '+235',
    name: 'Chad',
    icon: '🇹🇩',
  },
  {
    code: '+56',
    name: 'Chile',
    icon: '🇨🇱',
  },
  {
    code: '+86',
    name: 'China',
    icon: '🇨🇳',
  },
  {
    code: '+61',
    name: 'Christmas Island',
    icon: '🇨🇽',
  },
  {
    code: '+61',
    name: 'Cocos Islands',
    icon: '🇨🇨',
  },
  {
    code: '+57',
    name: 'Colombia',
    icon: '🇨🇴',
  },
  {
    code: '+269',
    name: 'Comoros',
    icon: '🇰🇲',
  },
  {
    code: '+682',
    name: 'Cook Islands',
    icon: '🇨🇰',
  },
  {
    code: '+506',
    name: 'Costa Rica',
    icon: '🇨🇷',
  },
  {
    code: '+385',
    name: 'Croatia',
    icon: '🇭🇷',
  },
  {
    code: '+53',
    name: 'Cuba',
    icon: '🇨🇺',
  },
  {
    code: '+599',
    name: 'Curacao',
    icon: '🇨🇼',
  },
  {
    code: '+357',
    name: 'Cyprus',
    icon: '🇨🇾',
  },
  {
    code: '+420',
    name: 'Czech Republic',
    icon: '🇨🇿',
  },
  {
    code: '+243',
    name: 'Democratic Republic of the Congo',
    icon: '🇨🇩',
  },
  {
    code: '+45',
    name: 'Denmark',
    icon: '🇩🇰',
  },
  {
    code: '+253',
    name: 'Djibouti',
    icon: '🇩🇯',
  },
  {
    code: '+1-767',
    name: 'Dominica',
    icon: '🇩🇲',
  },
  {
    code: '+1-809',
    name: 'Dominican Republic',
    icon: '🇩🇴',
  },
  {
    code: '+1-829',
    name: 'Dominican Republic',
    icon: '🇩🇴',
  },
  {
    code: '+1-849',
    name: 'Dominican Republic',
    icon: '🇩🇴',
  },
  {
    code: '+670',
    name: 'East Timor',
    icon: '🇹🇱',
  },
  {
    code: '+593',
    name: 'Ecuador',
    icon: '🇪🇨',
  },
  {
    code: '+20',
    name: 'Egypt',
    icon: '🇪🇬',
  },
  {
    code: '+503',
    name: 'El Salvador',
    icon: '🇸🇻',
  },
  {
    code: '+240',
    name: 'Equatorial Guinea',
    icon: '🇬🇶',
  },
  {
    code: '+291',
    name: 'Eritrea',
    icon: '🇪🇷',
  },
  {
    code: '+372',
    name: 'Estonia',
    icon: '🇪🇪',
  },
  {
    code: '+251',
    name: 'Ethiopia',
    icon: '🇪🇹',
  },
  {
    code: '+500',
    name: 'Falkland Islands',
    icon: '🇫🇰',
  },
  {
    code: '+298',
    name: 'Faroe Islands',
    icon: '🇫🇴',
  },
  {
    code: '+679',
    name: 'Fiji',
    icon: '🇫🇯',
  },
  {
    code: '+358',
    name: 'Finland',
    icon: '🇫🇮',
  },
  {
    code: '+33',
    name: 'France',
    icon: '🇫🇷',
  },
  {
    code: '+689',
    name: 'French Polynesia',
    icon: '🇵🇫',
  },
  {
    code: '+241',
    name: 'Gabon',
    icon: '🇬🇦',
  },
  {
    code: '+220',
    name: 'Gambia',
    icon: '🇬🇲',
  },
  {
    code: '+995',
    name: 'Georgia',
    icon: '🇬🇪',
  },
  {
    code: '+49',
    name: 'Germany',
    icon: '🇩🇪',
  },
  {
    code: '+233',
    name: 'Ghana',
    icon: '🇬🇭',
  },
  {
    code: '+350',
    name: 'Gibraltar',
    icon: '🇬🇮',
  },
  {
    code: '+30',
    name: 'Greece',
    icon: '🇬🇷',
  },
  {
    code: '+299',
    name: 'Greenland',
    icon: '🇬🇱',
  },
  {
    code: '+1-473',
    name: 'Grenada',
    icon: '🇬🇩',
  },
  {
    code: '+1-671',
    name: 'Guam',
    icon: '🇬🇺',
  },
  {
    code: '+502',
    name: 'Guatemala',
    icon: '🇬🇹',
  },
  {
    code: '+44-1481',
    name: 'Guernsey',
    icon: '🇬🇬',
  },
  {
    code: '+224',
    name: 'Guinea',
    icon: '🇬🇳',
  },
  {
    code: '+245',
    name: 'Guinea-Bissau',
    icon: '🇬🇼',
  },
  {
    code: '+592',
    name: 'Guyana',
    icon: '🇬🇾',
  },
  {
    code: '+509',
    name: 'Haiti',
    icon: '🇭🇹',
  },
  {
    code: '+504',
    name: 'Honduras',
    icon: '🇭🇳',
  },
  {
    code: '+852',
    name: 'Hong Kong',
    icon: '🇭🇰',
  },
  {
    code: '+36',
    name: 'Hungary',
    icon: '🇭🇺',
  },
  {
    code: '+354',
    name: 'Iceland',
    icon: '🇮🇸',
  },
  {
    code: '+91',
    name: 'India',
    icon: '🇮🇳',
  },
  {
    code: '+62',
    name: 'Indonesia',
    icon: '🇮🇩',
  },
  {
    code: '+98',
    name: 'Iran',
    icon: '🇮🇷',
  },
  {
    code: '+964',
    name: 'Iraq',
    icon: '🇮🇶',
  },
  {
    code: '+353',
    name: 'Ireland',
    icon: '🇮🇪',
  },
  {
    code: '+44-1624',
    name: 'Isle of Man',
    icon: '🇮🇲',
  },
  {
    code: '+972',
    name: 'Israel',
    icon: '🇮🇱',
  },
  {
    code: '+39',
    name: 'Italy',
    icon: '🇮🇹',
  },
  {
    code: '+225',
    name: 'Ivory Coast',
    icon: '🇨🇮',
  },
  {
    code: '+1-876',
    name: 'Jamaica',
    icon: '🇯🇲',
  },
  {
    code: '+81',
    name: 'Japan',
    icon: '🇯🇵',
  },
  {
    code: '+44-1534',
    name: 'Jersey',
    icon: '🇯🇪',
  },
  {
    code: '+962',
    name: 'Jordan',
    icon: '🇯🇴',
  },
  {
    code: '+7',
    name: 'Kazakhstan',
    icon: '🇰🇿',
  },
  {
    code: '+254',
    name: 'Kenya',
    icon: '🇰🇪',
  },
  {
    code: '+686',
    name: 'Kiribati',
    icon: '🇰🇮',
  },
  {
    code: '+383',
    name: 'Kosovo',
    icon: '🇽🇰',
  },
  {
    code: '+965',
    name: 'Kuwait',
    icon: '🇰🇼',
  },
  {
    code: '+996',
    name: 'Kyrgyzstan',
    icon: '🇰🇬',
  },
  {
    code: '+856',
    name: 'Laos',
    icon: '🇱🇦',
  },
  {
    code: '+371',
    name: 'Latvia',
    icon: '🇱🇻',
  },
  {
    code: '+961',
    name: 'Lebanon',
    icon: '🇱🇧',
  },
  {
    code: '+266',
    name: 'Lesotho',
    icon: '🇱🇸',
  },
  {
    code: '+231',
    name: 'Liberia',
    icon: '🇱🇷',
  },
  {
    code: '+218',
    name: 'Libya',
    icon: '🇱🇾',
  },
  {
    code: '+423',
    name: 'Liechtenstein',
    icon: '🇱🇮',
  },
  {
    code: '+370',
    name: 'Lithuania',
    icon: '🇱🇹',
  },
  {
    code: '+352',
    name: 'Luxembourg',
    icon: '🇱🇺',
  },
  {
    code: '+853',
    name: 'Macau',
    icon: '🇲🇴',
  },
  {
    code: '+389',
    name: 'Macedonia',
    icon: '🇲🇰',
  },
  {
    code: '+261',
    name: 'Madagascar',
    icon: '🇲🇬',
  },
  {
    code: '+265',
    name: 'Malawi',
    icon: '🇲🇼',
  },
  {
    code: '+60',
    name: 'Malaysia',
    icon: '🇲🇾',
  },
  {
    code: '+960',
    name: 'Maldives',
    icon: '🇲🇻',
  },
  {
    code: '+223',
    name: 'Mali',
    icon: '🇲🇱',
  },
  {
    code: '+356',
    name: 'Malta',
    icon: '🇲🇹',
  },
  {
    code: '+692',
    name: 'Marshall Islands',
    icon: '🇲🇭',
  },
  {
    code: '+222',
    name: 'Mauritania',
    icon: '🇲🇷',
  },
  {
    code: '+230',
    name: 'Mauritius',
    icon: '🇲🇺',
  },
  {
    code: '+262',
    name: 'Mayotte',
    icon: '🇾🇹',
  },
  {
    code: '+52',
    name: 'Mexico',
    icon: '🇲🇽',
  },
  {
    code: '+691',
    name: 'Micronesia',
    icon: '🇫🇲',
  },
  {
    code: '+373',
    name: 'Moldova',
    icon: '🇲🇩',
  },
  {
    code: '+377',
    name: 'Monaco',
    icon: '🇲🇨',
  },
  {
    code: '+976',
    name: 'Mongolia',
    icon: '🇲🇳',
  },
  {
    code: '+382',
    name: 'Montenegro',
    icon: '🇲🇪',
  },
  {
    code: '+1-664',
    name: 'Montserrat',
    icon: '🇲🇸',
  },
  {
    code: '+212',
    name: 'Morocco',
    icon: '🇲🇦',
  },
  {
    code: '+258',
    name: 'Mozambique',
    icon: '🇲🇿',
  },
  {
    code: '+95',
    name: 'Myanmar',
    icon: '🇲🇲',
  },
  {
    code: '+264',
    name: 'Namibia',
    icon: '🇳🇦',
  },
  {
    code: '+674',
    name: 'Nauru',
    icon: '🇳🇷',
  },
  {
    code: '+977',
    name: 'Nepal',
    icon: '🇳🇵',
  },
  {
    code: '+31',
    name: 'Netherlands',
    icon: '🇳🇱',
  },
  {
    code: '+599',
    name: 'Netherlands Antilles',
    icon: '🇦🇳',
  },
  {
    code: '+687',
    name: 'New Caledonia',
    icon: '🇳🇨',
  },
  {
    code: '+64',
    name: 'New Zealand',
    icon: '🇳🇿',
  },
  {
    code: '+505',
    name: 'Nicaragua',
    icon: '🇳🇮',
  },
  {
    code: '+227',
    name: 'Niger',
    icon: '🇳🇪',
  },
  {
    code: '+234',
    name: 'Nigeria',
    icon: '🇳🇬',
  },
  {
    code: '+683',
    name: 'Niue',
    icon: '🇳🇺',
  },
  {
    code: '+850',
    name: 'North Korea',
    icon: '🇰🇵',
  },
  {
    code: '+1-670',
    name: 'Northern Mariana Islands',
    icon: '🇲🇵',
  },
  {
    code: '+47',
    name: 'Norway',
    icon: '🇳🇴',
  },
  {
    code: '+968',
    name: 'Oman',
    icon: '🇴🇲',
  },
  {
    code: '+92',
    name: 'Pakistan',
    icon: '🇵🇰',
  },
  {
    code: '+680',
    name: 'Palau',
    icon: '🇵🇼',
  },
  {
    code: '+970',
    name: 'Palestine',
    icon: '🇵🇸',
  },
  {
    code: '+507',
    name: 'Panama',
    icon: '🇵🇦',
  },
  {
    code: '+675',
    name: 'Papua New Guinea',
    icon: '🇵🇬',
  },
  {
    code: '+595',
    name: 'Paraguay',
    icon: '🇵🇾',
  },
  {
    code: '+51',
    name: 'Peru',
    icon: '🇵🇪',
  },
  {
    code: '+63',
    name: 'Philippines',
    icon: '🇵🇭',
  },
  {
    code: '+64',
    name: 'Pitcairn',
    icon: '🇵🇳',
  },
  {
    code: '+48',
    name: 'Poland',
    icon: '🇵🇱',
  },
  {
    code: '+351',
    name: 'Portugal',
    icon: '🇵🇹',
  },
  {
    code: '+1-787',
    name: 'Puerto Rico',
    icon: '🇵🇷',
  },
  {
    code: '+1-939',
    name: 'Puerto Rico',
    icon: '🇵🇷',
  },
  {
    code: '+974',
    name: 'Qatar',
    icon: '🇶🇦',
  },
  {
    code: '+242',
    name: 'Republic of the Congo',
    icon: '🇨🇬',
  },
  {
    code: '+262',
    name: 'Reunion',
    icon: '🇷🇪',
  },
  {
    code: '+40',
    name: 'Romania',
    icon: '🇷🇴',
  },
  {
    code: '+7',
    name: 'Russia',
    icon: '🇷🇺',
  },
  {
    code: '+250',
    name: 'Rwanda',
    icon: '🇷🇼',
  },
  {
    code: '+590',
    name: 'Saint Barthelemy',
    icon: '🇧🇱',
  },
  {
    code: '+290',
    name: 'Saint Helena',
    icon: '🇸🇭',
  },
  {
    code: '+1-869',
    name: 'Saint Kitts and Nevis',
    icon: '🇰🇳',
  },
  {
    code: '+1-758',
    name: 'Saint Lucia',
    icon: '🇱🇨',
  },
  {
    code: '+590',
    name: 'Saint Martin',
    icon: '🇲🇫',
  },
  {
    code: '+508',
    name: 'Saint Pierre and Miquelon',
    icon: '🇵🇲',
  },
  {
    code: '+1-784',
    name: 'Saint Vincent and the Grenadines',
    icon: '🇻🇨',
  },
  {
    code: '+685',
    name: 'Samoa',
    icon: '🇼🇸',
  },
  {
    code: '+378',
    name: 'San Marino',
    icon: '🇸🇲',
  },
  {
    code: '+239',
    name: 'Sao Tome and Principe',
    icon: '🇸🇹',
  },
  {
    code: '+966',
    name: 'Saudi Arabia',
    icon: '🇸🇦',
  },
  {
    code: '+221',
    name: 'Senegal',
    icon: '🇸🇳',
  },
  {
    code: '+381',
    name: 'Serbia',
    icon: '🇷🇸',
  },
  {
    code: '+248',
    name: 'Seychelles',
    icon: '🇸🇨',
  },
  {
    code: '+232',
    name: 'Sierra Leone',
    icon: '🇸🇱',
  },
  {
    code: '+65',
    name: 'Singapore',
    icon: '🇸🇬',
  },
  {
    code: '+1-721',
    name: 'Sint Maarten',
    icon: '🇸🇽',
  },
  {
    code: '+421',
    name: 'Slovakia',
    icon: '🇸🇰',
  },
  {
    code: '+386',
    name: 'Slovenia',
    icon: '🇸🇮',
  },
  {
    code: '+677',
    name: 'Solomon Islands',
    icon: '🇸🇧',
  },
  {
    code: '+252',
    name: 'Somalia',
    icon: '🇸🇴',
  },
  {
    code: '+27',
    name: 'South Africa',
    icon: '🇿🇦',
  },
  {
    code: '+82',
    name: 'South Korea',
    icon: '🇰🇷',
  },
  {
    code: '+211',
    name: 'South Sudan',
    icon: '🇸🇸',
  },
  {
    code: '+34',
    name: 'Spain',
    icon: '🇪🇸',
  },
  {
    code: '+94',
    name: 'Sri Lanka',
    icon: '🇱🇰',
  },
  {
    code: '+249',
    name: 'Sudan',
    icon: '🇸🇩',
  },
  {
    code: '+597',
    name: 'Suriname',
    icon: '🇸🇷',
  },
  {
    code: '+47',
    name: 'Svalbard and Jan Mayen',
    icon: '🇸🇯',
  },
  {
    code: '+268',
    name: 'Swaziland',
    icon: '🇸🇿',
  },
  {
    code: '+46',
    name: 'Sweden',
    icon: '🇸🇪',
  },
  {
    code: '+41',
    name: 'Switzerland',
    icon: '🇨🇭',
  },
  {
    code: '+963',
    name: 'Syria',
    icon: '🇸🇾',
  },
  {
    code: '+886',
    name: 'Taiwan',
    icon: '🇹🇼',
  },
  {
    code: '+992',
    name: 'Tajikistan',
    icon: '🇹🇯',
  },
  {
    code: '+255',
    name: 'Tanzania',
    icon: '🇹🇿',
  },
  {
    code: '+66',
    name: 'Thailand',
    icon: '🇹🇭',
  },
  {
    code: '+228',
    name: 'Togo',
    icon: '🇹🇬',
  },
  {
    code: '+690',
    name: 'Tokelau',
    icon: '🇹🇰',
  },
  {
    code: '+676',
    name: 'Tonga',
    icon: '🇹🇴',
  },
  {
    code: '+1-868',
    name: 'Trinidad and Tobago',
    icon: '🇹🇹',
  },
  {
    code: '+216',
    name: 'Tunisia',
    icon: '🇹🇳',
  },
  {
    code: '+90',
    name: 'Turkey',
    icon: '🇹🇷',
  },
  {
    code: '+993',
    name: 'Turkmenistan',
    icon: '🇹🇲',
  },
  {
    code: '+1-649',
    name: 'Turks and Caicos Islands',
    icon: '🇹🇨',
  },
  {
    code: '+688',
    name: 'Tuvalu',
    icon: '🇹🇻',
  },
  {
    code: '+1-340',
    name: 'U.S. Virgin Islands',
    icon: '🇻🇮',
  },
  {
    code: '+256',
    name: 'Uganda',
    icon: '🇺🇬',
  },
  {
    code: '+380',
    name: 'Ukraine',
    icon: '🇺🇦',
  },
  {
    code: '+971',
    name: 'United Arab Emirates',
    icon: '🇦🇪',
  },
  {
    code: '+44',
    name: 'United Kingdom',
    icon: '🇬🇧',
  },
  {
    code: '+1',
    name: 'United States',
    icon: '🇺🇸',
  },
  {
    code: '+598',
    name: 'Uruguay',
    icon: '🇺🇾',
  },
  {
    code: '+998',
    name: 'Uzbekistan',
    icon: '🇺🇿',
  },
  {
    code: '+678',
    name: 'Vanuatu',
    icon: '🇻🇺',
  },
  {
    code: '+379',
    name: 'Vatican',
    icon: '🇻🇦',
  },
  {
    code: '+58',
    name: 'Venezuela',
    icon: '🇻🇪',
  },
  {
    code: '+84',
    name: 'Vietnam',
    icon: '🇻🇳',
  },
  {
    code: '+681',
    name: 'Wallis and Futuna',
    icon: '🇼🇫',
  },
  {
    code: '+212',
    name: 'Western Sahara',
    icon: '🇪🇭',
  },
  {
    code: '+967',
    name: 'Yemen',
    icon: '🇾🇪',
  },
  {
    code: '+260',
    name: 'Zambia',
    icon: '🇿🇲',
  },
  {
    code: '+263',
    name: 'Zimbabwe',
    icon: '🇿🇼',
  },
]
export default countryList
