import icons from '@/helpers/Icons.js';

export default {
  title: 'Design/Icons'
};

export const Icons = (_, { argTypes }) => ({
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
      <h1>Search icons</h1>
      <a href="/?path=/story/content-icon--icon">View documentation for icons <d-icon name="arrow-right"/></a>

      <d-textbox v-model="search" placeholder="Search for icon" icon="search" addon-align="left" addon-type="panel" />
      <div style="display: grid; grid-template-columns: repeat(auto-fit, 3em); gap: 1em;">
        <span
          v-for="icon in icons"
          :key="icon"
          :style="{ display: 'inline-block', width: '2em', height: '2em', margin: '1em'}"
          v-tooltip="icon"
          @click="copy(icon)"
        >
          <d-icon
            :name="icon"
            :title="icon"
            v-bind="$props"
          />
        </span>
      </div>
    </div>`
});

Icons.args = { size: 2 };
