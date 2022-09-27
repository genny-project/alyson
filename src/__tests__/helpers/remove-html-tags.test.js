import removeHtmlTags from 'utils/helpers/remove-html-tags'

describe('Remove HTML tags from the editor input', () => {
  it('should remove the html tags that have been inputted from the editor', () => {
    const input =
      '<h1>UNIT TESTING</h1><p>Unit testing involves the testing of each unit or an individual component of the software application<p>'
    const expectedResult =
      'UNIT TESTINGUnit testing involves the testing of each unit or an individual component of the software application'
    expect(removeHtmlTags(input)).toEqual(expectedResult)
  })
})
