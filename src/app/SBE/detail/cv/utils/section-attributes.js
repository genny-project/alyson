import { faUser, faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const sectionAttributes = {
  imageAttribute: 'PRI_IMAGE_URL',
  videoAttribute: 'PRI_VIDEO_URL',
  headerAttribute: 'PRI_NAME',
  contactDetails: {
    sectionIcon: faUser,
    title: 'Contact Details',
    attributes: ['PRI_PREFERRED_NAME', 'PRI_MOBILE', 'PRI_EMAIL', 'PRI_ADDRESS_FULL'],
  },

  internshipDetail: {
    sectionIcon: faBriefcase,
    title: 'Internship Details',
    attributes: ['PRI_START_DATE', 'PRI_ASSOC_DURATION', 'PRI_TRANSPORT'],
  },

  careerObj: {
    sectionIcon: faGraduationCap,
    title: 'Career Objective',
    attributes: ['PRI_CAREER_OBJ'],
  },
}

export default sectionAttributes
