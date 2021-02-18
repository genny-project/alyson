import { faUser, faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const sectionAttributes = () => {
  const imageAttribute = 'PRI_IMAGE_URL'
  const headerAttribute = 'PRI_NAME'
  const contactDetails = {
    sectionIcon: faUser,
    title: 'Contact Details',
    attributes: ['PRI_PREFERRED_NAME', 'PRI_MOBILE', 'PRI_EMAIL', 'PRI_ADDRESS_FULL'],
  }

  const internshipDetail = {
    sectionIcon: faBriefcase,
    title: 'Internship Details',
    attributes: ['PRI_START_DATE', 'PRI_ASSOC_DURATION', 'PRI_TRANSPORT'],
  }

  const careerObj = {
    sectionIcon: faGraduationCap,
    title: 'Career Objective',
    attributes: ['PRI_CAREER_OBJ'],
  }

  return { headerAttribute, imageAttribute, contactDetails, internshipDetail, careerObj }
}

export default sectionAttributes
