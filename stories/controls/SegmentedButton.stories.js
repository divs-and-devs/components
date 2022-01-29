import colors from '@/colors.json';

export default {
  title: 'Controls/Segmented Button',
  usesValue: true,
  argTypes: {
    color: {
      control: 'select',
      options: colors
    }
  },
  args: {
    options: {
      table: 'Table view',
      graph: 'Graph view'
    }
  }
};

export const SegmentedButton = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      value: 'table'
    };
  },
  template: '<d-segmented-button v-model="value" v-bind="$props" v-on="$props"/>'
});

export const MultipleOptions = SegmentedButton.bind({});
MultipleOptions.args = {
  options: {
    notHappy: 'Not happy',
    okay: 'Okay',
    happy: 'Happy',
    great: 'Great'
  }
};

export const WithIcons = SegmentedButton.bind({});
WithIcons.args = {
  options: {
    notHappy: {
      icon: 'frown',
      label: 'Not happy'
    },
    okay: {
      icon: 'meh',
      label: 'Okay'
    },
    happy: {
      icon: 'smile',
      label: 'Happy'
    },
    great: {
      icon: 'star',
      label: 'Great'
    }
  }
};

export const IconOnly = SegmentedButton.bind({});
IconOnly.args = {
  options: {
    notHappy: {
      icon: 'frown'
    },
    okay: {
      icon: 'meh'
    },
    happy: {
      icon: 'smile'
    },
    great: {
      icon: 'star'
    }
  }
};
