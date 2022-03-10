export default {
  title: 'Controls/Forms',

  parameters: {
    layout: 'fullscreen'
  },

  args: {
    disabled: false,
    required: false
  }
};

export const forms = (_, { argTypes }) => ({
  props: Object.keys(argTypes),

  data () {
    return {
      textbox: '',
      password: '',
      number: undefined,
      select: '',
      radio: '',
      date: '',
      dateRange: [null, null],
      checkbox: [],
      multiselect: [],
      autocomplete: '',
      slider: 50,
      switchValue: false,
      segmentedButton: 'option1',
      textarea: '',
      file: undefined
    };
  },

  template: /* html */`
    <d-container>
      <h1>Form controls</h1>
      <hr>
      <form @submit.prevent>
        <fieldset :disabled="disabled">
        <legend>All controls</legend>
          <d-textbox
            label="Textbox"
            placeholder="text"
            v-model="textbox"
            :required="required"
          />

          <d-textbox
            type="password"
            placeholder="password"
            v-model="password"
            label="Password"
            :required="required"
          />

          <d-number-input
            placeholder="Number"
            label="Number"
            v-model="number"
            :required="required"
          />

          <d-select
            label="Select"
            placeholder="select"
            v-model="select"
            :options="{ option1: 'option 1', option2: 'option 2', option3: 'option 3' }"
            :required="required"
          />

          <d-calendar
            label="Calendar"
            placeholder="calendar"
            v-model="date"
            :required="required"
          />

          <d-date-range
            label="Date range"
            placeholder="Date range"
            v-model="dateRange"
            :required="required"
          />

          <d-radio
            label="Radio"
            placeholder="radio"
            v-model="radio"
            :options="{ option1: 'option 1', option2: 'option 2', option3: 'option 3' }"
            :required="required"
          />

          <d-checkbox-group
            label="Checkbox"
            placeholder="checkbox"
            v-model="checkbox"
            :options="{ option1: 'option 1', option2: 'option 2', option3: 'option 3' }"
            :required="required"
          />

          <d-segmented-button
            label="Segmented Button"
            v-model="segmentedButton"
            :options="{ option1: 'option 1', option2: 'option 2', option3: 'option 3' }"
          />

          <d-auto-complete
            label="Autocomplete"
            placeholder="Autocomplete"
            v-model="autocomplete"
            :datasource="['option 1', 'option 2', 'option 3']"
            :required="required"
          />

          <d-multi-select
            label="Multiselect"
            placeholder="Multiselect"
            v-model="multiselect"
            :required="required"
          />

          <d-slider
            label="Slider"
            v-model="slider"
            :required="required"
          />

          <d-switch
            v-model="switchValue"
            :required="required"
          >
            Switch
          </d-switch>

          <d-text-area
            label="Textarea"
            placeholder="textarea"
            v-model="textarea"
            :required="required"
          />

          <d-upload
            label="upload"
            placeholder="text"
            v-model="file"
            preview
            :required="required"
          />
          <d-button
            submit
            icon="send"
            icon-align="right"
          >
            Submit
          </d-button>
        </fieldset>
      </form>
  </d-container>
  `
});
