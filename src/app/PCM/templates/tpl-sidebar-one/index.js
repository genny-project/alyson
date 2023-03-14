import EvtButton from 'app/PCM/components/evt-button'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'
import DefaultSidebar from 'app/PCM/templates/tpl-sidebar-one/default'
import InternmatchSidebar from 'app/PCM/templates/tpl-sidebar-one/internmatch'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'

const TemplateSidebarOne = ({ mappedPcm, maxItemCount, isSidebarCollapsed }) => {
  let maxItems = maxItemCount || Math.floor(window.innerHeight - 60) / 95

  const isProductInternmatch = useIsProductInternmatch()

  const evtButtons = mapQuestionGroup((ask, question, index) => {
    return (
      <EvtButton
        key={`${mappedPcm.PRI_QUESTION_CODE}-${ask?.questionCode}`}
        questionCode={mappedPcm.PRI_QUESTION_CODE}
        childCode={ask?.questionCode || ''}
        iconId={question?.icon || ''}
        vert={true}
        sidebarItem={true}
        isSidebarCollapsed={isSidebarCollapsed}
        maxItemCount={maxItemCount}
        index={index}
      />
    )
  })(mappedPcm.PRI_QUESTION_CODE)

  if (isProductInternmatch)
    return (
      <InternmatchSidebar
        mappedPcm={mappedPcm}
        maxItems={maxItems}
        evtButtons={evtButtons}
        isSidebarCollapsed={isSidebarCollapsed}
      />
    )
  return <DefaultSidebar mappedPcm={mappedPcm} maxItems={maxItems} evtButtons={evtButtons} />
}

export default TemplateSidebarOne
