<template>
  <q-page class="page__main">
    <form class="page__form" ref="$form">
      <CustomInput name="lastName" type="text" placeholder="Last name" iconName="student"
        validationCriteria="^[a-zA-Z]+$" @validate-input="checkValidity" />
      <CustomInput name="studentId" type="password" placeholder="Student Id (Include dash. Ex: 18-00829)"
        iconName="studentId" validationCriteria="^\d\d-\d\d\d\d\d$" validationErrorMessage="Please check input format"
        @validate-input="checkValidity" />
      <CustomInput name="violationType" type="select" placeholder="Violation" iconName="violationType"
        :selectOptions="violationTypeOptions" @validate-input="checkValidity" />
      <CustomInput name="guardOnDuty" type="select" placeholder="Guard on Duty" iconName="guardOnDuty"
        :selectOptions="guardOnDutyOptions" @validate-input="checkValidity" />
      <CustomButton @click="handleSubmit" text="Submit" class="page__form-button" />
    </form>
    <p class="page__footer">
      First time user?
      <router-link class="page__footer-link" to="/register">
        Register
      </router-link>
    </p>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useQuasar } from "quasar";
import UserService from "../services/UserService"
import CustomInput from "src/components/input/CustomInput.vue";
import CustomButton from "src/components/CustomButton.vue";
const $q = useQuasar();

// =========================================================================== >

const inputs = reactive({
  studentId: {
    inputValue: undefined,
    isValid: false
  },
  lastName: {
    inputValue: undefined,
    isValid: false
  },
  violationType: {
    inputValue: undefined,
    isValid: false
  },
  guardOnDuty: {
    inputValue: undefined,
    isValid: false
  },
})

const guardOnDutyOptions = [
  "N/A",
  "Dario Fullion",
  "Iyrome Argao",
  "Jayson Verzo",
  "Melvin Boston",
  "Mercedita Abalona",
  "Reejay Ortega",
  "Remond Rivera",
  "Ronaldo Villacruel"
];

const violationTypeOptions = [
  "Forgotten id",
  "Wearing flat shoes",
  "Wearing PE uniform",
  "Wearing white socks",
  "Colored undershirt",
  "Wearing freestyle clothing",
  "Colored hair",
  "Not wearing sando",
  "Colored hair aside from black color, highlights not allowed",
  'Shaved hairline for male, male with "pusod" or pony tails',
  "Folded sleeves of school uniforms or t shirts, blouses, polo shirts",
  "Making excessive noise or loud talking in the classroom, library, halls and corridors or making boisterous laughter and screaming within the school premise",
  "Eating inside the classroom, laboratories, chapel or in any designated non- eating areas",
  "Spitting on the grounds, classrooms or corridors",
  "Undue disturbance of one's class or that of another",
  "Unauthorized use and/or failure to turn-off cellular phones and other similar communication gadgets or electronic devices during classes, seminars/forum or any school activity",
  "Use of cellular phones during Holy Mass causing disturbance in the solemnity of the celebration",
  "Use of earpiece or headsets while walking along corridors or stairways and during class hours",
  "Selling tickets or soliciting contributions and selling commodities inside the school campus without clearance from proper authorities",
  "Acts which disturb the peace and order of the school unless properly classified as major offense (case of quarrelling like teasing, bullying, having a shouting match)",
  "Wearing caps inside or within any building i.e. classroom, chapel, corridors, canteen and formed assemblies",
  "Non-presentation of school I.D. within the campus upon request by a security office/ guard or any member of the school personnel",
  "Loitering on corridors during class hours/ at any time",
  "Non-submission of excuse slips or letters of excuse when required",
  "Unauthorized charging of laptops, cellular phones and other electronic gadgets inside the classroom",
  "Unauthorized or illegal possession of controlled substances",
  "Bringing and/or drinking liquor or alcoholic beverages",
  "Carrying or possession of firearms, deadly weapons and explosives within the school premises",
  "Computer hacking",
  "Engaging in any action, deliberately or resulting from gross negligence that might lead to serious injury or loss of life of the self or another person",
  "Gross acts of disrespect, in words or in deeds, which tend to insult or subject to public ridicule or contempt any member of the administration, faculty, personnel, students, and security",
  "Involvement in any form of attack to another person",
  "Proselytizing against and/or maligning the Catholic Church, her teachings and practices",
  "Cyber bullying",
  "Posting indecent pictures or videos either of one self or of others through the social media",
  "Posting of vulgar, profane, libelous, and cursing words in the social media against the image of the school or any administrator, personnel or student",
  "Creating a fake/troll account in the social media to impersonate an administrator or any student or personnel",
  "Vandalism in any form and/or deliberate destruction of school property or any property belonging to any member of the administration, faculty, support staff or visitors",
  "Engaging in activities that result i the damages of school properties",
  "Stealing signages",
  "Theft of school, personnel, visitors or fellow students' property or attempts to do such criminal acts",
  "Deliberate disruption, obstruction, or interference of the normal functioning of classes, school offices, or any recognized school activities that tend to create disorder or disturbance",
  "Membership in any unrecognized association/organization or fraternity/sorority/gang",
  "Smoking within the school premises or approved off-campus activities or in public places while in school uniform, including e-cigarettes",
  "Any forms of gambling within the school premises or outside in school uniform",
  "Acts that malign the good name and reputation of the school and its duly constituted authority such as public and malicious imputation of a crime, vice or defect whether real or imaginary, or of any act, omission, condition, status or circumstances tending to discredit or cause dishonor or contempt to the name or reputation of the school",
  "Bribery or acceptance of a bribe, or any act meant to give or obtain favor, or advantage illegally or unfairly, whether attempted, frustrated or consummated",
  "Committing acts outside the campus which affect the good name, order or welfare of the school or have direct and immediate effect on the discipline, morale or general welfare of the school, including those through the social media, electronic means, especially acts considered crimes under the laws of the land of which a person has been formally charged or convicted",
  "Habitual disregard or willful violation of established policies and regulations",
  "Willfully disregarding sanctions within the prescribed period given by Student Development Office or  decisions by the Peace Committee",
  "Any form of dishonesty committed in the context of an academic exercise",
  "Forging/Tampering with and/or falsifying academic or official records, notices on bulletin boards",
  "Unauthorized distribution or display of printed materials which do not carry the name of the author or sponsor, endorsing, attaching or inserting unauthorized materials in school publications",
  "Unauthorized use of school equipment, fixtures and facilities",
  "Committing any form of misrepresentation",
  "Pregnancy out of wedlock also applies to the male student who impregnates any woman out of wedlock",
  "Acts of immorality i.e. premarital sex, extra marital sex, abortion, co-habiting without the benefit of marriage",
  "Engaging in prostitution or employment in immoral establishments, acts of conduct and relationships which are contrary to the laws, principles and morale adhered to by the school and the teachings of the Catholic Church",
  "Public display of intimate gestures of affection inside or outside the school while wearing the school uniform which constitute obscene and immoral conduct and/or causing scandal to the public",
  "Posting indecent pictures/photos/videos through the social/print/electronic media–e.g. Internet, smart phones, Facebook/Instagram and the like which are contrary to the core values adhered to by the school and the teachings of the Catholic Church",
  "Accessing, possessing, preparing, publishing, displaying, or distributing in any form (printed, physical or electronic) of pornographic, obscene, libelous or subversive materials inside and outside the school premises",
  "Serious negligence of patient resulting to injury or death",
  "Smoking and drinking alcoholic drinks in beer garden or bar",
  "Bringing in or selling cigarettes within the school premises",
];

// =========================================================================== >

const checkValidity = (e) => {
  inputs[e.name].inputValue = e.value;
  inputs[e.name].isValid = e.isValueValid;
};

const handleSubmit = () => {
  let areAllValid = true;

  for (const input in inputs) {
    if (!inputs[input].inputValue || !inputs[input].isValid) {
      areAllValid = false;
    }
  }

  if (!areAllValid) {
    $q.notify({
      message: 'Please complete required fields',
      color: 'warning',
      textColor: 'secondary',
      icon: 'warning',
      badgeColor: 'warning',
      badgeTextColor: 'secondary'
    })
  } else {
    recordViolation(
      inputs.lastName.inputValue,
      inputs.studentId.inputValue,
      inputs.violationType.inputValue,
      inputs.guardOnDuty.inputValue
    );
  }
}

const recordViolation = async (lastName, studentId, violationType, guardOnDuty) => {
  const notif = $q.notify({
    message: 'Recording...',
    color: 'accent',
    textColor: 'secondary',
    group: false,
    timeout: 0,
    spinner: true,
  })

  try {
    const response = await UserService.recordViolation(lastName, studentId, violationType, guardOnDuty)
    notif({
      message: response.data.message,
      color: 'accent',
      textColor: 'secondary',
      timeout: 4000,
      spinner: false,
      icon: 'done',
    })
  } catch (error) {
    notif({
      message: 'Error',
      caption: error.response.data.message,
      color: 'warning',
      textColor: 'secondary',
      timeout: 12000,
      spinner: false,
      icon: 'warning',
      actions: [
        { label: 'Dismiss', color: 'primary', textColor: 'secondary', handler: () => { } }
      ]
    })
  }
}
</script>

<style scoped lang="sass">
.page
  &__main
    position: relative

  &__form
    display: flex
    flex-direction: column
    gap: 2.4rem
    align-items: center
    width: 38.5rem
    margin: auto
    
  &__footer
    margin-top: 4.8rem
    font-size: 1.4rem
    font-weight: 500

  &__footer-link
    font-weight: 700
</style>
