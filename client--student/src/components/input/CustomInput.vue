<template>
  <div class="custom-input__wrapper">
    <div class="custom-input__g1">
      <div class="custom-input-main__wrapper">
        <div
          class="custom-input-main__icon-wrapper"
          :class="{
            'custom-input-main__icon-wrapper--active': inputActive,
            'custom-input-main__icon-wrapper--inactive': !inputActive,
          }"
          v-html="inputIcons[props.iconName].icon"
          ref="$icon"
        ></div>
        <input
          class="custom-input-main__input"
          :class="{ 'custom-input__input--select': props.type === 'select' }"
          :placeholder="props.placeholder"
          :type="props.type === 'select' ? 'text' : props.type"
          ref="$input"
        />
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="custom-input-main__dropdown"
          :class="{ 'custom-input-main__dropdown--active': selectActive }"
          v-if="props.type === 'select'"
          ref="$dropdown"
        >
          <path
            d="M8.66655 10.8539C8.12755 11.2735 7.8612 11.2702 7.3332 10.8481L1.49825 6.70767C1.00158 6.31049 0.999967 5.83331 1.99986 5.83331H14C15 5.83331 15.0043 6.3161 14.4939 6.71356L8.66655 10.8539Z"
            fill="#8B86BD"
          />
        </svg>
      </div>
      <p
        class="custom-input__invalid"
        :class="{ 'custom-input__invalid--active': valErrMesActive === true }"
        v-if="props.type === 'select'"
      >
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0003 8.99999C11.0003 8.73478 11.1056 8.48042 11.2932 8.29289C11.4807 8.10535 11.7351 7.99999 12.0003 7.99999C12.2655 7.99999 12.5198 8.10535 12.7074 8.29289C12.8949 8.48042 13.0003 8.73478 13.0003 8.99999V11C13.0003 11.2652 12.8949 11.5196 12.7074 11.7071C12.5198 11.8946 12.2655 12 12.0003 12C11.7351 12 11.4807 11.8946 11.2932 11.7071C11.1056 11.5196 11.0003 11.2652 11.0003 11V8.99999ZM12.0003 13.5C11.6024 13.5 11.2209 13.658 10.9396 13.9393C10.6583 14.2206 10.5003 14.6022 10.5003 15C10.5003 15.3978 10.6583 15.7793 10.9396 16.0607C11.2209 16.342 11.6024 16.5 12.0003 16.5C12.3981 16.5 12.7796 16.342 13.0609 16.0607C13.3422 15.7793 13.5003 15.3978 13.5003 15C13.5003 14.6022 13.3422 14.2206 13.0609 13.9393C12.7796 13.658 12.3981 13.5 12.0003 13.5ZM10.4283 2.91799C10.5857 2.63968 10.8141 2.40815 11.0903 2.24705C11.3665 2.08595 11.6805 2.00107 12.0003 2.00107C12.32 2.00107 12.634 2.08595 12.9102 2.24705C13.1864 2.40815 13.4149 2.63968 13.5723 2.91799L21.7563 17.256C22.4523 18.476 21.5783 20 20.1823 20H3.82027C2.42427 20 1.55027 18.476 2.24627 17.256L10.4303 2.91599L10.4283 2.91799ZM12.0003 4.23799L4.16627 17.966H19.8343L12.0003 4.23799Z"
              fill="black"
            />
          </svg>
        </span>
        Select only from the given options
      </p>
      <p
        class="custom-input__invalid"
        :class="{ 'custom-input__invalid--active': valErrMesActive }"
        v-else-if="props.validationErrorMessage"
      >
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0003 8.99999C11.0003 8.73478 11.1056 8.48042 11.2932 8.29289C11.4807 8.10535 11.7351 7.99999 12.0003 7.99999C12.2655 7.99999 12.5198 8.10535 12.7074 8.29289C12.8949 8.48042 13.0003 8.73478 13.0003 8.99999V11C13.0003 11.2652 12.8949 11.5196 12.7074 11.7071C12.5198 11.8946 12.2655 12 12.0003 12C11.7351 12 11.4807 11.8946 11.2932 11.7071C11.1056 11.5196 11.0003 11.2652 11.0003 11V8.99999ZM12.0003 13.5C11.6024 13.5 11.2209 13.658 10.9396 13.9393C10.6583 14.2206 10.5003 14.6022 10.5003 15C10.5003 15.3978 10.6583 15.7793 10.9396 16.0607C11.2209 16.342 11.6024 16.5 12.0003 16.5C12.3981 16.5 12.7796 16.342 13.0609 16.0607C13.3422 15.7793 13.5003 15.3978 13.5003 15C13.5003 14.6022 13.3422 14.2206 13.0609 13.9393C12.7796 13.658 12.3981 13.5 12.0003 13.5ZM10.4283 2.91799C10.5857 2.63968 10.8141 2.40815 11.0903 2.24705C11.3665 2.08595 11.6805 2.00107 12.0003 2.00107C12.32 2.00107 12.634 2.08595 12.9102 2.24705C13.1864 2.40815 13.4149 2.63968 13.5723 2.91799L21.7563 17.256C22.4523 18.476 21.5783 20 20.1823 20H3.82027C2.42427 20 1.55027 18.476 2.24627 17.256L10.4303 2.91599L10.4283 2.91799ZM12.0003 4.23799L4.16627 17.966H19.8343L12.0003 4.23799Z"
              fill="black"
            />
          </svg>
        </span>
        {{ props.validationErrorMessage }}
      </p>
      <p
        class="custom-input__invalid"
        :class="{ 'custom-input__invalid--active': valErrMesActive }"
        v-else
      >
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.0003 8.99999C11.0003 8.73478 11.1056 8.48042 11.2932 8.29289C11.4807 8.10535 11.7351 7.99999 12.0003 7.99999C12.2655 7.99999 12.5198 8.10535 12.7074 8.29289C12.8949 8.48042 13.0003 8.73478 13.0003 8.99999V11C13.0003 11.2652 12.8949 11.5196 12.7074 11.7071C12.5198 11.8946 12.2655 12 12.0003 12C11.7351 12 11.4807 11.8946 11.2932 11.7071C11.1056 11.5196 11.0003 11.2652 11.0003 11V8.99999ZM12.0003 13.5C11.6024 13.5 11.2209 13.658 10.9396 13.9393C10.6583 14.2206 10.5003 14.6022 10.5003 15C10.5003 15.3978 10.6583 15.7793 10.9396 16.0607C11.2209 16.342 11.6024 16.5 12.0003 16.5C12.3981 16.5 12.7796 16.342 13.0609 16.0607C13.3422 15.7793 13.5003 15.3978 13.5003 15C13.5003 14.6022 13.3422 14.2206 13.0609 13.9393C12.7796 13.658 12.3981 13.5 12.0003 13.5ZM10.4283 2.91799C10.5857 2.63968 10.8141 2.40815 11.0903 2.24705C11.3665 2.08595 11.6805 2.00107 12.0003 2.00107C12.32 2.00107 12.634 2.08595 12.9102 2.24705C13.1864 2.40815 13.4149 2.63968 13.5723 2.91799L21.7563 17.256C22.4523 18.476 21.5783 20 20.1823 20H3.82027C2.42427 20 1.55027 18.476 2.24627 17.256L10.4303 2.91599L10.4283 2.91799ZM12.0003 4.23799L4.16627 17.966H19.8343L12.0003 4.23799Z"
              fill="black"
            />
          </svg>
        </span>
        Invalid input
      </p>
    </div>
    <ul
      class="custom-input-options__wrapper"
      :class="{ 'custom-input-options__wrapper--active': selectActive }"
      v-if="props.type === 'select'"
      ref="$optionsWrapper"
    >
      <li
        class="custom-input-options__option"
        v-for="(option, key) of props.selectOptions"
        :key="key"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  name: String,
  type: String,
  placeholder: String,
  iconName: String,
  selectOptions: Array,
  validationErrorMessage: String,
  validationCriteria: String,
});

const emit = defineEmits(["validateInput"]);

const inputIcons = {
  course: {
    icon: ' <svg class="custom-input__svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5.83325 5.00002C5.83325 4.77901 5.92105 4.56705 6.07733 4.41076C6.23361 4.25448 6.44557 4.16669 6.66659 4.16669H13.3333C13.5543 4.16669 13.7662 4.25448 13.9225 4.41076C14.0788 4.56705 14.1666 4.77901 14.1666 5.00002V6.66669C14.1666 6.8877 14.0788 7.09966 13.9225 7.25594C13.7662 7.41222 13.5543 7.50002 13.3333 7.50002H6.66659C6.44557 7.50002 6.23361 7.41222 6.07733 7.25594C5.92105 7.09966 5.83325 6.8877 5.83325 6.66669V5.00002ZM7.08325 6.25002H12.9166V5.41669H7.08325V6.25002ZM3.33325 3.75002C3.33325 3.19749 3.55275 2.66758 3.94345 2.27688C4.33415 1.88618 4.86405 1.66669 5.41659 1.66669H14.9999C15.2735 1.66669 15.5444 1.72057 15.7972 1.82527C16.0499 1.92997 16.2796 2.08343 16.4731 2.27688C16.6665 2.47034 16.82 2.7 16.9247 2.95276C17.0294 3.20552 17.0833 3.47643 17.0833 3.75002V15.625C17.0833 15.7908 17.0174 15.9498 16.9002 16.067C16.783 16.1842 16.624 16.25 16.4583 16.25H4.58325C4.58325 16.471 4.67105 16.683 4.82733 16.8393C4.98361 16.9956 5.19557 17.0834 5.41659 17.0834H16.4583C16.624 17.0834 16.783 17.1492 16.9002 17.2664C17.0174 17.3836 17.0833 17.5426 17.0833 17.7084C17.0833 17.8741 17.0174 18.0331 16.9002 18.1503C16.783 18.2675 16.624 18.3334 16.4583 18.3334H5.41659C4.86405 18.3334 4.33415 18.1139 3.94345 17.7232C3.55275 17.3325 3.33325 16.8026 3.33325 16.25V3.75002ZM4.58325 15H15.8333V3.75002C15.8333 3.52901 15.7455 3.31704 15.5892 3.16076C15.4329 3.00448 15.2209 2.91669 14.9999 2.91669H5.41659C5.19557 2.91669 4.98361 3.00448 4.82733 3.16076C4.67105 3.31704 4.58325 3.52901 4.58325 3.75002V15Z" fill="#8B86BD"/> </svg> ',
  },
  guardOnDuty: {
    icon: ' <svg class="custom-input__svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8.75008 4.16669C8.75008 4.82973 8.48669 5.46561 8.01785 5.93445C7.54901 6.40329 6.91312 6.66669 6.25008 6.66669C5.58704 6.66669 4.95116 6.40329 4.48231 5.93445C4.01347 5.46561 3.75008 4.82973 3.75008 4.16669C3.75008 3.50365 4.01347 2.86776 4.48231 2.39892C4.95116 1.93008 5.58704 1.66669 6.25008 1.66669C6.91312 1.66669 7.54901 1.93008 8.01785 2.39892C8.48669 2.86776 8.75008 3.50365 8.75008 4.16669ZM13.7501 8.33335C14.3026 8.33335 14.8325 8.11386 15.2232 7.72316C15.6139 7.33246 15.8334 6.80255 15.8334 6.25002C15.8334 5.69749 15.6139 5.16758 15.2232 4.77688C14.8325 4.38618 14.3026 4.16669 13.7501 4.16669C13.1975 4.16669 12.6676 4.38618 12.2769 4.77688C11.8862 5.16758 11.6667 5.69749 11.6667 6.25002C11.6667 6.80255 11.8862 7.33246 12.2769 7.72316C12.6676 8.11386 13.1975 8.33335 13.7501 8.33335ZM11.1634 8.95835C11.2201 9.15669 11.2501 9.36669 11.2501 9.58335V12.0834C11.2501 12.3378 11.192 12.5888 11.08 12.8172C10.9681 13.0457 10.8053 13.2455 10.6042 13.4013C10.4031 13.5571 10.169 13.6648 9.91984 13.7161C9.67068 13.7675 9.41307 13.7611 9.16675 13.6975V16.6667C9.16671 16.9807 9.07798 17.2883 8.91078 17.554C8.74357 17.8198 8.5047 18.0329 8.22168 18.1688C7.93865 18.3048 7.62298 18.358 7.31102 18.3224C6.99907 18.2868 6.70352 18.1638 6.45841 17.9675C6.21331 18.1638 5.91776 18.2868 5.60581 18.3224C5.29385 18.358 4.97818 18.3048 4.69515 18.1688C4.41213 18.0329 4.17325 17.8198 4.00605 17.554C3.83885 17.2883 3.75012 16.9807 3.75008 16.6667V13.6975C3.50376 13.7611 3.24615 13.7675 2.99699 13.7161C2.74783 13.6648 2.51373 13.5571 2.31263 13.4013C2.11153 13.2455 1.94876 13.0457 1.83681 12.8172C1.72486 12.5888 1.66668 12.3378 1.66675 12.0834V9.58335C1.66675 8.97557 1.90819 8.39267 2.33796 7.9629C2.76773 7.53313 3.35063 7.29169 3.95841 7.29169H8.95842C9.45727 7.29164 9.94251 7.45437 10.3405 7.75517C10.7384 8.05597 11.0274 8.47841 11.1634 8.95835ZM12.0209 8.95835H16.4584C17.0662 8.95835 17.6491 9.1998 18.0789 9.62957C18.5086 10.0593 18.7501 10.6422 18.7501 11.25V12.7084C18.7501 12.9628 18.692 13.2138 18.58 13.4422C18.4681 13.6707 18.3053 13.8705 18.1042 14.0263C17.9031 14.1821 17.669 14.2898 17.4198 14.3411C17.1707 14.3925 16.9131 14.3861 16.6667 14.3225V16.6667C16.6667 16.9807 16.578 17.2883 16.4108 17.554C16.2436 17.8198 16.0047 18.0329 15.7217 18.1688C15.4386 18.3048 15.123 18.358 14.811 18.3224C14.4991 18.2868 14.2035 18.1638 13.9584 17.9675C13.7133 18.1638 13.4178 18.2868 13.1058 18.3224C12.7939 18.358 12.4782 18.3048 12.1952 18.1688C11.9121 18.0329 11.6733 17.8198 11.5061 17.554C11.3389 17.2883 11.2501 16.9807 11.2501 16.6667V13.9467C11.7617 13.4884 12.0834 12.8234 12.0834 12.0834V9.58335C12.0834 9.36919 12.0617 9.16002 12.0209 8.95835Z" fill="#8B86BD"/> </svg> ',
  },
  student: {
    icon: ' <svg class="custom-input__svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.1667 11.25C14.1667 10.9185 14.0351 10.6006 13.8006 10.3661C13.5662 10.1317 13.2483 10 12.9167 10H7.08341C6.75189 10 6.43395 10.1317 6.19953 10.3661C5.96511 10.6006 5.83341 10.9185 5.83341 11.25V11.6667C5.83341 13.3092 7.38341 15 10.0001 15C12.6167 15 14.1667 13.3092 14.1667 11.6667V11.25ZM12.2917 6.87502C12.2917 6.26723 12.0503 5.68434 11.6205 5.25457C11.1908 4.8248 10.6079 4.58335 10.0001 4.58335C9.39229 4.58335 8.8094 4.8248 8.37963 5.25457C7.94986 5.68434 7.70841 6.26723 7.70841 6.87502C7.70841 7.48281 7.94986 8.0657 8.37963 8.49547C8.8094 8.92524 9.39229 9.16669 10.0001 9.16669C10.6079 9.16669 11.1908 8.92524 11.6205 8.49547C12.0503 8.0657 12.2917 7.48281 12.2917 6.87502ZM18.3334 10C18.3334 14.6025 14.6026 18.3334 10.0001 18.3334C5.39758 18.3334 1.66675 14.6025 1.66675 10C1.66675 5.39752 5.39758 1.66669 10.0001 1.66669C14.6026 1.66669 18.3334 5.39752 18.3334 10ZM17.0834 10C17.0834 8.1214 16.3371 6.31973 15.0088 4.99135C13.6804 3.66296 11.8787 2.91669 10.0001 2.91669C8.12146 2.91669 6.31979 3.66296 4.99141 4.99135C3.66303 6.31973 2.91675 8.1214 2.91675 10C2.91675 11.8786 3.66303 13.6803 4.99141 15.0087C6.31979 16.3371 8.12146 17.0834 10.0001 17.0834C11.8787 17.0834 13.6804 16.3371 15.0088 15.0087C16.3371 13.6803 17.0834 11.8786 17.0834 10Z" fill="#8B86BD"/> </svg>',
  },
  studentId: {
    icon: ' <svg class="custom-input__svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4.64283 4.99997C4.35866 4.99997 4.08614 5.11286 3.88521 5.31379C3.68428 5.51472 3.5714 5.78724 3.5714 6.0714V8.92855C3.5714 9.21271 3.68428 9.48523 3.88521 9.68616C4.08614 9.88709 4.35866 9.99997 4.64283 9.99997H8.21425C8.49841 9.99997 8.77094 9.88709 8.97187 9.68616C9.1728 9.48523 9.28568 9.21271 9.28568 8.92855V6.0714C9.28568 5.78724 9.1728 5.51472 8.97187 5.31379C8.77094 5.11286 8.49841 4.99997 8.21425 4.99997H4.64283ZM15 7.49997C15 7.97357 14.8118 8.42778 14.4769 8.76266C14.1421 9.09755 13.6879 9.28569 13.2143 9.28569C12.7407 9.28569 12.2864 9.09755 11.9516 8.76266C11.6167 8.42778 11.4285 7.97357 11.4285 7.49997C11.4285 7.02637 11.6167 6.57217 11.9516 6.23728C12.2864 5.9024 12.7407 5.71426 13.2143 5.71426C13.6879 5.71426 14.1421 5.9024 14.4769 6.23728C14.8118 6.57217 15 7.02637 15 7.49997ZM9.99997 11.0714V11.25C9.99997 12.0551 10.3198 12.8272 10.8891 13.3965C11.4584 13.9659 12.2306 14.2857 13.0357 14.2857H13.3928C14.1979 14.2857 14.9701 13.9659 15.5394 13.3965C16.1087 12.8272 16.4285 12.0551 16.4285 11.25V11.0714C16.4285 10.7872 16.3157 10.5147 16.1147 10.3138C15.9138 10.1129 15.6413 9.99997 15.3571 9.99997H11.0714C10.7872 9.99997 10.5147 10.1129 10.3138 10.3138C10.1129 10.5147 9.99997 10.7872 9.99997 11.0714ZM4.10997 2.85712C3.39957 2.85712 2.71826 3.13932 2.21593 3.64165C1.7136 4.14398 1.4314 4.82529 1.4314 5.53569V14.4643C1.4314 15.1747 1.7136 15.856 2.21593 16.3583C2.71826 16.8606 3.39957 17.1428 4.10997 17.1428H15.8928C16.6032 17.1428 17.2845 16.8606 17.7869 16.3583C18.2892 15.856 18.5714 15.1747 18.5714 14.4643V5.53569C18.5714 4.82529 18.2892 4.14398 17.7869 3.64165C17.2845 3.13932 16.6032 2.85712 15.8928 2.85712H4.10997ZM2.50283 5.53569C2.50283 5.10945 2.67215 4.70066 2.97355 4.39927C3.27494 4.09787 3.68373 3.92855 4.10997 3.92855H15.8928C16.3191 3.92855 16.7278 4.09787 17.0292 4.39927C17.3306 4.70066 17.5 5.10945 17.5 5.53569V14.4643C17.5 14.8905 17.3306 15.2993 17.0292 15.6007C16.7278 15.9021 16.3191 16.0714 15.8928 16.0714H4.11068C3.68444 16.0714 3.27566 15.9021 2.97426 15.6007C2.67286 15.2993 2.50354 14.8905 2.50354 14.4643V5.53569H2.50283Z" fill="#8B86BD"/> </svg> ',
  },
  violationType: {
    icon: ' <svg class="custom-input__svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.125 18.75C12.3863 18.75 11.6549 18.6045 10.9724 18.3218C10.2899 18.0391 9.66985 17.6248 9.14752 17.1025C8.62519 16.5801 8.21086 15.9601 7.92818 15.2776C7.64549 14.5951 7.5 13.8637 7.5 13.125C7.5 12.3863 7.64549 11.6549 7.92818 10.9724C8.21086 10.29 8.62519 9.66986 9.14752 9.14753C9.66985 8.6252 10.2899 8.21086 10.9724 7.92818C11.6549 7.6455 12.3863 7.5 13.125 7.5C14.6168 7.5 16.0476 8.09264 17.1025 9.14753C18.1574 10.2024 18.75 11.6332 18.75 13.125C18.75 14.6168 18.1574 16.0476 17.1025 17.1025C16.0476 18.1574 14.6168 18.75 13.125 18.75ZM9.62125 15.745L15.7463 9.62C14.9037 8.98813 13.8616 8.68135 12.8111 8.75601C11.7606 8.83066 10.7723 9.28174 10.0277 10.0264C9.28298 10.7711 8.83191 11.7594 8.75726 12.8099C8.6826 13.8603 8.98937 14.9025 9.62125 15.745ZM10.505 16.6288C11.3475 17.2606 12.3897 17.5674 13.4401 17.4927C14.4906 17.4181 15.4789 16.967 16.2236 16.2223C16.9683 15.4777 17.4193 14.4894 17.494 13.4389C17.5686 12.3884 17.2619 11.3463 16.63 10.5038L10.505 16.6288ZM12.0325 6.3375C10.4279 6.5952 8.96663 7.41373 7.90875 8.6475C7.24143 8.47917 6.63997 8.11446 6.18217 7.60057C5.72438 7.08668 5.43132 6.44724 5.3409 5.76498C5.25048 5.08271 5.36687 4.38901 5.675 3.77362C5.98313 3.15822 6.46883 2.64944 7.06927 2.31309C7.66971 1.97674 8.35727 1.8283 9.04299 1.88697C9.72872 1.94564 10.3811 2.20872 10.9156 2.64218C11.4502 3.07564 11.8424 3.65953 12.0415 4.31833C12.2407 4.97713 12.2375 5.68052 12.0325 6.3375ZM7 10C6.52 10.9375 6.25 12 6.25 13.125C6.25 14.7625 6.8225 16.265 7.7775 17.4463C4.44375 17.0663 2.5 14.7538 2.5 12.5V11.875C2.5 11.3777 2.69754 10.9008 3.04917 10.5492C3.40081 10.1975 3.87772 10 4.375 10H7Z" fill="#8B86BD"/> </svg> ',
  },
  year: {
    icon: ' <svg class="custom-input__svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.7917 2.5C15.51 2.5 16.1988 2.78534 16.7067 3.29325C17.2147 3.80116 17.5 4.49004 17.5 5.20833V14.7917C17.5 15.51 17.2147 16.1988 16.7067 16.7067C16.1988 17.2147 15.51 17.5 14.7917 17.5H5.20833C4.49004 17.5 3.80116 17.2147 3.29325 16.7067C2.78534 16.1988 2.5 15.51 2.5 14.7917V5.20833C2.5 4.49004 2.78534 3.80116 3.29325 3.29325C3.80116 2.78534 4.49004 2.5 5.20833 2.5H14.7917ZM16.25 7.08333H3.75V14.7917C3.75 15.5967 4.40333 16.25 5.20833 16.25H14.7917C15.1784 16.25 15.5494 16.0964 15.8229 15.8229C16.0964 15.5494 16.25 15.1784 16.25 14.7917V7.08333ZM6.45833 12.0833C6.7346 12.0833 6.99955 12.1931 7.1949 12.3884C7.39025 12.5838 7.5 12.8487 7.5 13.125C7.5 13.4013 7.39025 13.6662 7.1949 13.8616C6.99955 14.0569 6.7346 14.1667 6.45833 14.1667C6.18207 14.1667 5.91711 14.0569 5.72176 13.8616C5.52641 13.6662 5.41667 13.4013 5.41667 13.125C5.41667 12.8487 5.52641 12.5838 5.72176 12.3884C5.91711 12.1931 6.18207 12.0833 6.45833 12.0833ZM10 12.0833C10.2763 12.0833 10.5412 12.1931 10.7366 12.3884C10.9319 12.5838 11.0417 12.8487 11.0417 13.125C11.0417 13.4013 10.9319 13.6662 10.7366 13.8616C10.5412 14.0569 10.2763 14.1667 10 14.1667C9.72373 14.1667 9.45878 14.0569 9.26343 13.8616C9.06808 13.6662 8.95833 13.4013 8.95833 13.125C8.95833 12.8487 9.06808 12.5838 9.26343 12.3884C9.45878 12.1931 9.72373 12.0833 10 12.0833ZM6.45833 8.75C6.7346 8.75 6.99955 8.85975 7.1949 9.0551C7.39025 9.25045 7.5 9.5154 7.5 9.79167C7.5 10.0679 7.39025 10.3329 7.1949 10.5282C6.99955 10.7236 6.7346 10.8333 6.45833 10.8333C6.18207 10.8333 5.91711 10.7236 5.72176 10.5282C5.52641 10.3329 5.41667 10.0679 5.41667 9.79167C5.41667 9.5154 5.52641 9.25045 5.72176 9.0551C5.91711 8.85975 6.18207 8.75 6.45833 8.75ZM10 8.75C10.2763 8.75 10.5412 8.85975 10.7366 9.0551C10.9319 9.25045 11.0417 9.5154 11.0417 9.79167C11.0417 10.0679 10.9319 10.3329 10.7366 10.5282C10.5412 10.7236 10.2763 10.8333 10 10.8333C9.72373 10.8333 9.45878 10.7236 9.26343 10.5282C9.06808 10.3329 8.95833 10.0679 8.95833 9.79167C8.95833 9.5154 9.06808 9.25045 9.26343 9.0551C9.45878 8.85975 9.72373 8.75 10 8.75ZM13.5417 8.75C13.8179 8.75 14.0829 8.85975 14.2782 9.0551C14.4736 9.25045 14.5833 9.5154 14.5833 9.79167C14.5833 10.0679 14.4736 10.3329 14.2782 10.5282C14.0829 10.7236 13.8179 10.8333 13.5417 10.8333C13.2654 10.8333 13.0004 10.7236 12.8051 10.5282C12.6097 10.3329 12.5 10.0679 12.5 9.79167C12.5 9.5154 12.6097 9.25045 12.8051 9.0551C13.0004 8.85975 13.2654 8.75 13.5417 8.75ZM14.7917 3.75H5.20833C4.82156 3.75 4.45063 3.90365 4.17714 4.17714C3.90365 4.45063 3.75 4.82156 3.75 5.20833V5.83333H16.25V5.20833C16.25 4.82156 16.0964 4.45063 15.8229 4.17714C15.5494 3.90365 15.1784 3.75 14.7917 3.75Z" fill="#8B86BD"/> </svg> ',
  },
};

// =========================================================================== >

/* Change color if input has text, or has focus */

const $input = ref(null);
const inputActive = ref(false);

onMounted(() => {
  $input.value.addEventListener("focus", () => {
    inputActive.value = true;
    $input.value.select();
  });

  $input.value.addEventListener("focusout", () => {
    if (!$input.value.value) {
      inputActive.value = false;
    }
  });
});

// =========================================================================== >

/* Draw options for select input */

const selectActive = ref(false);
const $optionsWrapper = ref(null);

onMounted(() => {
  if (props.type === "select") {
    const $options = $optionsWrapper.value.querySelectorAll(
      ".custom-input-options__option"
    );

    dropdownToggle($options);
    filterOptions($options);
  }
});

const dropdownToggle = ($options) => {
  $input.value.addEventListener("focus", () => {
    selectActive.value = true;
  });

  $input.value.addEventListener("blur", () => {
    clickListen($options);
    setTimeout(() => {
      selectActive.value = false;
    }, 400);
  });
};

const filterOptions = ($options) => {
  $input.value.addEventListener("input", () => {
    $options.forEach(($option) => {
      !$option.textContent
        .toLowerCase()
        .includes($input.value.value.toLowerCase())
        ? ($option.style.display = "none")
        : ($option.style.display = "block");
    });
  });
};

const clickListen = ($options) => {
  $options.forEach(($option) => {
    $option.addEventListener("click", () => {
      $input.value.value = $option.textContent;
      inputActive.value = true;
    });
  });
};

// =========================================================================== >

/* Focus on input on icon/dropdown click */

const $icon = ref(null);
const $dropdown = ref(null);

onMounted(() => {
  $icon.value.addEventListener("click", () => {
    $input.value.select();
  });

  if (props.type === "select") {
    $dropdown.value.addEventListener("click", () => {
      !selectActive.value ? $input.value.select() : $input.value.focusout();
    });
  }
});

// =========================================================================== >

/* Validation error message */

const valErrMesActive = ref(false);

onMounted(() => {
  if (props.type === "select") {
    validateSelect();
  } else {
    validateNonSelect();
  }
});

const validateSelect = () => {
  let hasNoMatch = true;

  $input.value.addEventListener("blur", () => {
    setTimeout(() => {
      hasNoMatch = true;
      props.selectOptions.forEach((selectOption) => {
        if (
          selectOption.toLowerCase() === $input.value.value.toLowerCase().trim()
        ) {
          return (hasNoMatch = false);
        }
      });

      const $options = $optionsWrapper.value.querySelectorAll(
        ".custom-input-options__option"
      );
      $options.forEach(($option) => {
        $option.addEventListener("click", () => {
          hasNoMatch = true;
        });
      });

      hasNoMatch
        ? (valErrMesActive.value = true)
        : (valErrMesActive.value = false);
    }, 200);
  });
};

const validateNonSelect = () => {
  $input.value.addEventListener("blur", () => {
    validationFn();
  });

  watch(valErrMesActive, (newVEM) => {
    if (newVEM) {
      $input.value.addEventListener("input", () => validationFn());
    }
  });
};

const validationFn = () => {
  if (props.validationCriteria) {
    const regex = new RegExp(props.validationCriteria);
    !regex.test($input.value.value.trim().toLowerCase())
      ? (valErrMesActive.value = true)
      : (valErrMesActive.value = false);
  } else {
    !$input.value.value
      ? (valErrMesActive.value = true)
      : (valErrMesActive.value = false);
  }
};

// =========================================================================== >

/* Emit event to pass input data and validity of data */

const input = ref({
  name: props.name,
  value: false,
  isValueValid: false,
});

watch(valErrMesActive, (newValErrMesActive) => {
  newValErrMesActive
    ? (input.value.isValueValid = false)
    : (input.value.isValueValid = true);
});

onMounted(() => {
  $input.value.addEventListener("input", () => {
    if (props.type !== "select") validate();
    emitInput();
  });

  if (props.type === "select") {
    const $options = $optionsWrapper.value.querySelectorAll(
      ".custom-input-options__option"
    );

    $input.value.addEventListener("blur", () => {
      let hasMatch = false;

      setTimeout(() => {
        hasMatch = false;

        props.selectOptions.forEach((selectOption) => {
          if (
            selectOption.toLowerCase() ===
            $input.value.value.toLowerCase().trim()
          ) {
            return (hasMatch = true);
          }
        });

        !hasMatch
          ? (input.value.isValueValid = false)
          : (input.value.isValueValid = true);

        emitInput();
      }, 200);

      // $options.forEach(($option) => {
      // $option.addEventListener("click", () => {
      // hasMatch = true;
      // emitInput();
      // });
      // });
    });
  }
});

const validate = () => {
  if (props.validationCriteria) {
    const regex = new RegExp(props.validationCriteria);
    !regex.test($input.value.value.trim().toLowerCase())
      ? (input.value.isValueValid = false)
      : (input.value.isValueValid = true);
  } else {
    !$input.value.value
      ? (input.value.isValueValid = false)
      : (input.value.isValueValid = true);
  }
};

const emitInput = () => {
  input.value.value = $input.value.value;
  emit("validateInput", { ...input.value });
};
</script>

<style lang="sass">
.custom-input__wrapper
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  gap: .8rem
  width: 100%


.custom-input__g1
  display: flex
  flex-direction: column
  align-items: flex-start
  gap: 1.6rem
  width: 100%


.custom-input-main
  &__wrapper
    display: flex
    gap: 1.2rem
    width: 100%
    padding: 1.6rem 2.4rem
    border-radius: 1.6rem
    background: $secondary-1
    text-align: left
    font-size: 1.4rem
    font-weight: 300
    color: $primary-1

  &__input
    color: $accent
    flex: 1

  &__input::placeholder
    color: $primary-1

  &__input::selection
    color: #fff
    background-color: $accent

  &__icon-wrapper
    display: flex
    align-items: center
    cursor: pointer

  &__icon-wrapper svg path
    transition: fill 200ms ease-out

  &__icon-wrapper--active svg path
    fill: $accent

  &__icon-wrapper--inactive svg path
    fill: $primary-1

  &__dropdown
    transition: transform 200ms ease-out
    cursor: pointer

  &__dropdown--active
    transform: scaleY(-1)

  &__dropdown path
    fill: $accent


.custom-input__invalid
  display: none
  margin-bottom: 0
  padding-left: 2.4rem
  font-size: 1.4rem
  color: $warning

  & span
    width: 2rem
    height: 2rem
    margin-right: 1.4rem

  & span svg
    width: 100%
    height: 100%

  & span svg path
    fill: $warning

  &--active
    display: flex
    align-items: center
    animation: custom-input__invalid--active 400ms ease-out 128ms


.custom-input-options
  &__wrapper
    position: absolute
    top: 6.4rem
    width: 87.5%
    max-height: 20.6rem
    display: none
    flex-direction: column
    gap: 2px
    overflow-x: hidden
    overflow-y: auto
    border-radius: 1.6rem
    background-color: #fff
    box-shadow: 0 .4rem 1.6rem 0 rgba($accent, .32)

  &__wrapper--active
    z-index: 999
    display: flex
    animation: custom-input-options__wrapper--active 200ms ease-out

  &__wrapper::-webkit-scrollbar
    width: .4rem
    display: none

  &__wrapper::-webkit-scrollbar-thumb
    background: $accent
    border-radius: .2rem

  &__option
    display: block
    padding: 1.6rem 3.2rem
    background-color: $secondary-1
    font-weight: 300
    font-size: 1.4rem
    color: $accent
    text-align: left
    cursor: pointer
    transition: background-color 200ms ease

  &__option:hover
    background-color: #fff



@keyframes custom-input-options__wrapper--active
  0%
    opacity: 0
  100%
    opacity: 1

@keyframes custom-input__invalid--active
  0%
    opacity: 0
    transform: translate(0)
  10%
    opacity: 1
    transform: translate(-1rem)
  20%
    opacity: 1
    transform: translate(0)
  30%
    opacity: 1
    transform: translate(1rem)
  40%
    opacity: 1
    transform: translate(-1rem)
  50%
    opacity: 1
    transform: translate(0)
  60%
    opacity: 1
    transform: translate(1rem)
  70%
    opacity: 1
    transform: translate(-1rem)
  80%
    opacity: 1
    transform: translate(0)
  90%
    opacity: 1
    transform: translate(1rem)
  100%
    opacity: 1
    transform: translate(0)
</style>
