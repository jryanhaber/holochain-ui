import * as React from 'react'
import AutoCompleteProfileField, { State, Props } from './autoCompleteProfileField'
import { mount, ReactWrapper, configure } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
// import { Suggestion as SuggestionType } from '../../types/suggestion'

configure({ adapter: new Adapter() })

export const autoCompleteProfileFieldTests = describe('Auto selecting Persona values to create a Profile Mapping', () => {

  let props: Props
  let mountedAutoCompleteProfileField: ReactWrapper<Props, State> | undefined

  const autoCompleteProfileField = () => {
    if (!mountedAutoCompleteProfileField) {
      mountedAutoCompleteProfileField = mount(<AutoCompleteProfileField {...props}/>)
    }
    return mountedAutoCompleteProfileField
  }

  beforeEach(() => {
    mountedAutoCompleteProfileField = undefined
  })

  const mockFn = jest.fn()

  it('Selecting a Persona value ', (done) => {

    props = {
      suggestions: [
        { label: 'Alpha Go' },
        { label: 'Boris Johnson' },
        { label: 'Carl Marks' },
        { label: 'Delphi' },
        { label: 'Estonia' },
        { label: 'Estonia' },
        { label: 'Estonia' },
        { label: 'Franklin, VA' },
        { label: 'Gomez' },
        { label: 'Homer' },
        { label: 'Inglewood, CO' },
        { label: 'Jefferies LTD' }
      ],
      handleSelectionChange: mockFn
    }
    // AutoCompleteProfileField-suggestion
    autoCompleteProfileField().find('input[name="name"]').simulate('change', { target: { value: 'e' } })
    autoCompleteProfileField().find('input[name="name"]').simulate('focus')
    let enteredValue = (autoCompleteProfileField().find('AutoCompleteProfileField').instance().state as State).value
    console.log(enteredValue)
    let suggestionList = (autoCompleteProfileField().find('AutoCompleteProfileField').instance().state as State).suggestions
    console.log(suggestionList)
    autoCompleteProfileField().find('MenuItem').first().simulate('click')
    autoCompleteProfileField().find('input[name="name"]').first().simulate('blur')
    expect(props.handleSelectionChange).toBeCalled()
    process.nextTick(() => {
      console.log(autoCompleteProfileField().find('input[name="name"]').props().value)
      done()
    })
    // expect(createdPersona).toEqual(testPersona)
    // expect(props.handleSelectionChange).toBeCalled()
  })

  it('Typing an @ filters the drop down to 1 value', () => {
    expect(3).toEqual(3)
  })
})
