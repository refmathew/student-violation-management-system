<template>
  <div class="input--search__container" :class="{ 'input--search__container--active': inputActive }">
    <div class="input--search__icon" v-html="searchIconSvg" />
    <input class="input--search__input" :class="{ 'input--search__input--active': inputValue }" type="search"
      ref="inputSearch" :placeholder="placeholder" v-model="inputValue" @input="handleInput" @blur="handleBlur"
      @focus="handleFocus" />
  </div>
</template>

<script>
export default {
  name: "InputSearch",
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    searchIconSvg: {
      type: String,
      default: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.9634 15.024C12.6155 16.1008 10.9065 16.6207 9.18732 16.4768C7.46813 16.333 5.86928 15.5363 4.71913 14.2504C3.56899 12.9645 2.95485 11.287 3.00286 9.5625C3.05087 7.83797 3.75737 6.19727 4.97728 4.97737C6.19718 3.75746 7.83788 3.05096 9.56241 3.00295C11.2869 2.95494 12.9644 3.56908 14.2503 4.71922C15.5362 5.86937 16.3329 7.46822 16.4767 9.18741C16.6206 10.9066 16.1007 12.6156 15.0239 13.9635L20.7809 19.719C20.9218 19.8598 21.0009 20.0509 21.0009 20.25C21.0009 20.4492 20.9218 20.6402 20.7809 20.781C20.6401 20.9218 20.4491 21.001 20.2499 21.001C20.0508 21.001 19.8598 20.9218 19.7189 20.781L13.9649 15.024H13.9634ZM14.9999 9.75001C14.9999 9.06057 14.8641 8.37788 14.6003 7.74093C14.3365 7.10397 13.9497 6.52521 13.4622 6.0377C12.9747 5.5502 12.396 5.16348 11.759 4.89965C11.1221 4.63581 10.4394 4.50001 9.74992 4.50001C9.06048 4.50001 8.37779 4.63581 7.74083 4.89965C7.10387 5.16348 6.52512 5.5502 6.03761 6.0377C5.5501 6.52521 5.16339 7.10397 4.89955 7.74093C4.63572 8.37788 4.49992 9.06057 4.49992 9.75001C4.49992 11.1424 5.05305 12.4778 6.03761 13.4623C7.02218 14.4469 8.35754 15 9.74992 15C11.1423 15 12.4777 14.4469 13.4622 13.4623C14.4468 12.4778 14.9999 11.1424 14.9999 9.75001Z" fill="#F2F2FD"/> </svg>`
    },
    color: {
      type: String,
    }
  },
  data() {
    return {
      inputValue: '',
      inputActive: false,
    }
  },
  methods: {
    handleBlur() {
      this.inputActive = false;
    },
    handleFocus() {
      this.inputActive = true;
    },
    handleInput() {
      this.$emit('cInput', this.inputValue);

      this.inputActive = true;
    }
  },
  emits: [
    'cInput'
  ],
  mounted() {
    if (this.$route.name === 'findPage') {
      this.$refs.inputSearch.focus()
    }
  }
}
</script>

<style scoped lang="scss">
.input--search {

  &__container {
    display: flex;
    justify-content: flex-start;
    gap: 1rem;
    width: 48%;
    padding: 1.6rem 2.4rem;
    background-color: $secondary-2;
    border-radius: 1.6rem;
    box-shadow: 0 .4rem 1.6rem rgba($primary-1, .16);
    transition: box-shadow 400ms ease;

    &--active {
      box-shadow: 0 0 0 rgba($primary-1, .16);
    }

    &:hover {
      box-shadow: 0 0 0 rgba($primary-1, .16);
    }

    &:focus {
      box-shadow: 0 0 0 rgba($primary-1, .16);
    }
  }

  &__icon {
    display: flex;

    &:deep(svg path) {
      fill: $primary-2;
    }
  }

  &__input {
    flex: 1;
    font-size: 1.2rem;
    color: $accent;

    &::placeholder {
      color: $primary-2;
      font-weight: 400;
    }
  }
}
</style>
