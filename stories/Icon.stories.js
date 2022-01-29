import icons from '@/helpers/Icons.js';
import colors from '@/colors.json';
import IconComponent from '@/components/Icon.vue';

export default {
  title: 'Content/Icon',
  component: IconComponent,
  argTypes: {
    color: {
      control: 'select',
      options: colors
    },

    name: {
      control: 'select',
      options: icons
    },

    size: {
      control: 'number'
    }
  }
};

export const Icon = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: /* html */`
    <d-icon
      v-bind="$props"
    />`
});

export const AllIcons = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      search: ''
    };
  },
  methods: {
    copy (name) {
      navigator.clipboard.writeText(`<d-icon name="${name}" />`);
      this.$toast({ title: 'Copied icon.', subtitle: `Copied "<d-icon name="${name}" />" to clipboard.`, icon: name });
    }
  },

  computed: {
    icons () {
      return icons.filter((x) => {
        return x.toLowerCase().includes(this.search);
      });
    }
  },

  template: /* html */`
    <div>
      <d-textbox v-model="search" placeholder="Search for icon" icon="search" addon-align="left" addon-type="panel"/>
      <span
        :style="{ display: 'inline-block', width: size + 'em', height: size + 'em', margin: size / 2 + 'em'}"
        v-for="icon in icons"
        :key="icon"
        v-tooltip="icon"
        @click="copy(icon)"
      >
        <d-icon
          :name="icon"
          :title="icon"
          v-bind="$props"
        />
      </span>
    </div>`
});

AllIcons.args = { size: 2 };

export const FilledIcon = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data () {
    return {
      icons,
      filled: false
    };
  },

  mounted () {
    setInterval(() => { this.filled = !this.filled; }, 1000);
  },
  methods: {
    copy (name) {
      navigator.clipboard.writeText(`<d-icon name="${name}" />`);
      this.$toast({ title: 'Copied icon.', subtitle: `Copied "<d-icon name="${name}" />" to clipboard.`, icon: name });
    }
  },
  template: /* html */`
    <div>
      <span
        :style="{ display: 'inline-block', width: size + 'em', height: size + 'em', margin: size / 2 + 'em'}"
        v-for="icon in icons"
        :key="icon"
        v-tooltip="icon"
        @click="copy(icon)"
      >
        <d-icon
          :name="icon"
          :title="icon"
          v-bind="$props"
        />
      </span>
    </div>`
});
