<template>
  <div class="upload" :class="{ invalid: error || isInvalid }">
    <label v-if="label" :for="id">{{ label }}</label>
    <label :for="id" class="box" :class="{ hovering }">
      <input
        :id="id"
        ref="input"
        type="file"
        :name="id"
        :accept="accept"
        :required="required"
        @input="uploadFile"
        @invalid="isInvalid = true"
        @dragenter="hovering = true"
        @dragleave="hovering = false"
        @dragend="hovering = false"
      >
      <transition name="fade" mode="out-in">
        <p v-if="!file" key="empty-state">
          <slot :hovering="hovering">
            <transition name="fade" mode="out-in">
              <span v-if="!hovering" class="hint">
                <d-icon name="file" />
                Select {{ name }} to upload
              </span>
              <span v-else class="hint">
                <d-icon name="file" />
                Uploading file...
              </span>
            </transition>
          </slot>
        </p>
        <p v-else key="success-state" class="hint">
          <slot v-if="file" name="success" :filename="file.name">
            <d-icon name="check" /> File
            <strong>{{ file.name }}</strong> selected.
          </slot>
        </p>
      </transition>
    </label>

    <div v-if="preview" class="preview">
      <slot name="preview" :url="imagePreview">
        <d-skeleton v-if="loadingPreview" type="box" />
        <img v-else-if="imagePreview" :src="imagePreview" :alt="file.name">
      </slot>
    </div>

    <p v-if="error || isInvalid" class="error">
      {{ error || invalid }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: null,
      default: undefined,
      required: true
    },

    name: {
      type: String,
      default: 'file'
    },

    label: {
      type: String,
      default: undefined
    },

    accept: {
      type: String,
      default: '*'
    },

    preview: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      hovering: false,
      id: Math.random()
        .toString()
        .substring(2)
        .split('')
        .map(x => String.fromCharCode(65 + Number(x)))
        .join(''),
      file: this.value,
      error: '',
      isInvalid: false,
      imagePreview: undefined,
      loadingPreview: false
    };
  },

  computed: {
    invalid: {
      set (value) {
        this.$refs.input?.setCustomValidity(value ?? '');
      },
      get () {
        return this.$refs.input?.validationMessage;
      }
    }
  },

  watch: {
    value () {
      this.file = this.value;
    },

    file () {
      if (!this.preview) return;

      if (!this.file) {
        this.imagePreview = undefined;
        return;
      }

      const fr = new FileReader();

      fr.addEventListener('load', () => {
        this.imagePreview = fr.result;
      });
      fr.readAsDataURL(this.file);

      this.loadingPreview = false;
    }
  },

  methods: {
    uploadFile (event) {
      this.hovering = false;
      this.invalid = '';
      this.error = '';
      this.imagePreview = undefined;

      const { files } = event.target;

      if (files.length > 1) {
        this.error = 'Select one file please.';
        return;
      }

      if (!new RegExp(this.accept.replace('*', '.*')).test(files[0].type)) {
        this.error = 'Unsupported file type.';
        return;
      }

      this.loadingPreview = true;
      this.file = files[0];

      this.$emit('input', this.file);
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  margin: 1rem 0;
  cursor: pointer;

  label:not(.box) {
    font-family: $body-font, sans-serif;
    font-size: 0.8rem;
    display: block;
    margin: 0.5rem 0;
    transition: color 250ms ease;
  }

  .error {
    color: $error;
    font-family: $body-font, sans-serif;
    font-size: 0.8em;
    text-align: left;
  }

  &.invalid > .box {
    border-color: $error;
    color: $error;
  }

  .box {
    @include flex;

    font-size: 1rem;
    text-align: center;
    background-color: $shade-100;
    border: 1px solid $shade-300;
    border-radius: $border-radius;
    padding: 3rem 1rem;
    color: $primary;
    position: relative;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: border-color 250ms ease, background-color 250ms ease,
      color 250ms ease;

    input {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      cursor: pointer;
    }

    .hint .icon {
      display: block;
      margin: 0 auto 1rem;
      font-size: 2rem;
    }

    &:hover {
      background-color: $background;
      border-color: $primary;
      color: $primary;

      body.dark & {
        color: $primary-fade;
      }
    }

    input[type="file"]:focus + &,
    &.hovering {
      background-color: $shade-200;
      border-color: $primary;
      cursor: drop;
    }

    p {
      vertical-align: middle svg {
        vertical-align: middle;
      }
    }
  }

  .preview {
    max-width: 90%;
    margin: 0 auto;
    @include flex;

    img {
      border-radius: $border-radius;
      max-width: 100%;
    }
  }
}
</style>
