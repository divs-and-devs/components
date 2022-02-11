import ProfilePictureComponent from '@/components/ProfilePicture.vue';
export default {
  title: 'Content/Profile Picture',
  component: ProfilePictureComponent,
  argTypes: {
    size: {
      control: 'number'
    }
  },

  args: {
    size: 4
  }
};

export const ProfilePicture = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: /* html */`
    <d-profile-picture
      v-bind="$props"
    />`
});

export const FallbackIcon = ProfilePicture.bind({});
FallbackIcon.args = {
  icon: 'smile'
};

export const WithValidUserProfileIcon = ProfilePicture.bind({});
WithValidUserProfileIcon.args = {
  url: 'https://thispersondoesnotexist.com/image'
};

export const WithInvalidUserProfileIcon = ProfilePicture.bind({});
WithInvalidUserProfileIcon.args = {
  url: 'https://-.com'
};

export const WithName = ProfilePicture.bind({});
WithName.args = {
  fullName: 'Roy Ermers'
};
