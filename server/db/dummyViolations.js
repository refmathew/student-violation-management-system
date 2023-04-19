const _ = require('lodash');
const date_fns = require('date-fns');
const db = require('./connect.js');

let sql = 'INSERT INTO Violations (StudentId, Violation, Guard, Timestamp) VALUES'

let studentIds = [];

const violationsMajor = [
  `Unauthorized or illegal possession of controlled substances`,
  `Bringing and/or drinking liquor or alcoholic beverages`,
  `Carrying or possession of firearms, deadly weapons and explosives within the school premises`,
  `Computer hacking`,
  `Engaging in any action, deliberately or resulting from gross negligence that might lead to serious injury or loss of life of the self or another person`,
  `Gross acts of disrespect, in words or in deeds, which tend to insult or subject to public ridicule or contempt any member of the administration, faculty, personnel, students, and security`,
  `Involvement in any form of attack to another person`,
  `Proselytizing against and/or maligning the Catholic Church, her teachings and practices`,
  `Cyber bullying`,
  `Posting indecent pictures or videos either of one self or of others through the social media`,
  `Posting of vulgar, profane, libelous, and cursing words in the social media against the image of the school or any administrator, personnel or student`,
  `Creating a fake/troll account in the social media to impersonate an administrator or any student or personnel`,
  `Vandalism in any form and/or deliberate destruction of school property or any property belonging to any member of the administration, faculty, support staff or visitors`,
  `Engaging in activities that result i the damages of school properties`,
  `Stealing signages`,
  `Theft of school, personnel, visitors or fellow students' property or attempts to do such criminal acts`,
  `Deliberate disruption, obstruction, or interference of the normal functioning of classes, school offices, or any recognized school activities that tend to create disorder or disturbance`,
  `Membership in any unrecognized association/organization or fraternity/sorority/gang`,
  `Smoking within the school premises or approved off-campus activities or in public places while in school uniform, including e-cigarettes`,
  `Any forms of gambling within the school premises or outside in school uniform`,
  `Acts that malign the good name and reputation of the school and its duly constituted authority such as public and malicious imputation of a crime, vice or defect whether real or imaginary, or of any act, omission, condition, status or circumstances tending to discredit or cause dishonor or contempt to the name or reputation of the school`,
  `Bribery or acceptance of a bribe, or any act meant to give or obtain favor, or advantage illegally or unfairly, whether attempted, frustrated or consummated`,
  `Committing acts outside the campus which affect the good name, order or welfare of the school or have direct and immediate effect on the discipline, morale or general welfare of the school, including those through the social media, electronic means, especially acts considered crimes under the laws of the land of which a person has been formally charged or convicted`,
  `Habitual disregard or willful violation of established policies and regulations`,
  `Willfully disregarding sanctions within the prescribed period given by Student Development Office or  decisions by the Peace Committee`,
  `Any form of dishonesty committed in the context of an academic exercise`,
  `Forging/Tampering with and/or falsifying academic or official records, notices on bulletin boards`,
  `Unauthorized distribution or display of printed materials which do not carry the name of the author or sponsor, endorsing, attaching or inserting unauthorized materials in school publications`,
  `Unauthorized use of school equipment, fixtures and facilities`,
  `Committing any form of misrepresentation`,
  `Pregnancy out of wedlock also applies to the male student who impregnates any woman out of wedlock`,
  `Acts of immorality i.e. premarital sex, extra marital sex, abortion, co-habiting without the benefit of marriage`,
  `Engaging in prostitution or employment in immoral establishments, acts of conduct and relationships which are contrary to the laws, principles and morale adhered to by the school and the teachings of the Catholic Church`,
  `Public display of intimate gestures of affection inside or outside the school while wearing the school uniform which constitute obscene and immoral conduct and/or causing scandal to the public`,
  `Posting indecent pictures/photos/videos through the social/print/electronic media–e.g. Internet, smart phones, Facebook/Instagram and the like which are contrary to the core values adhered to by the school and the teachings of the Catholic Church`,
  `Accessing, possessing, preparing, publishing, displaying, or distributing in any form (printed, physical or electronic) of pornographic, obscene, libelous or subversive materials inside and outside the school premises`,
  `Serious negligence of patient resulting to injury or death`,
  `Smoking and drinking alcoholic drinks in beer garden or bar`,
  `Bringing in or selling cigarettes within the school premises`,
];

const violationsMinor = [
  `Wearing flat shoes`,
  `Wearing PE uniform`,
  `Wearing white socks`,
  `Colored undershirt`,
  `Wearing freestyle clothing`,
  `Not wearing sando for women`,
  `Colored hair aside from black color, highlights`,
  `Non-presentation of school I.D. within the campus upon request by a security office/ guard or any member of the school personnel`,
]


/* Create bias agains N/A because it is the guards who usually spot violations*/
const guards = [
  "N/A",
  "Dario Fullion",
  "Dario Fullion",
  "Dario Fullion",
  "Dario Fullion",
  "Dario Fullion",
  "Iyrome Argao",
  "Iyrome Argao",
  "Iyrome Argao",
  "Iyrome Argao",
  "Iyrome Argao",
  "Jayson Verzo",
  "Jayson Verzo",
  "Jayson Verzo",
  "Jayson Verzo",
  "Jayson Verzo",
  "Melvin Boston",
  "Melvin Boston",
  "Melvin Boston",
  "Melvin Boston",
  "Melvin Boston",
  "Mercedita Abalona",
  "Mercedita Abalona",
  "Mercedita Abalona",
  "Mercedita Abalona",
  "Mercedita Abalona",
  "Reejay Ortega",
  "Reejay Ortega",
  "Reejay Ortega",
  "Reejay Ortega",
  "Reejay Ortega",
  "Remond Rivera",
  "Remond Rivera",
  "Remond Rivera",
  "Remond Rivera",
  "Remond Rivera",
  "Ronaldo Villacruel",
  "Ronaldo Villacruel",
  "Ronaldo Villacruel",
  "Ronaldo Villacruel",
  "Ronaldo Villacruel",
]

const randomDate = (start, end) => {
  let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  date = date_fns.format(date, 'yyyy-MM-dd HH:mm:ss')

  /* Do not allow Sundays */
  if (date_fns.isSunday(date_fns.parseISO(date))) return randomDate(start, end);

  /* Only between 6:00 and 18:00 */
  if (!(date_fns.parseISO(date).getHours() >= 6) || !(date_fns.parseISO(date).getHours() <= 18)) return randomDate(start, end);

  return date
}

db.all('SELECT StudentId from Students', (err, rows) => {
  err
    ? console.log(err)
    : studentIds = rows.map(row => row.StudentId)
})

const getRandomData = () => {
  let studentId = _.sample(studentIds);
  let guard = _.sample(guards);
  let timestamp = randomDate(new Date(2023, 0, 1), new Date());
  let violation;

  /* Guards usually only spot minor violations */
  guard !== "N/A"
    ? violation = _.sample(violationsMinor)
    : violation = _.sample(violationsMajor);

  /* surround data with quotes for sql */
  let randomData = [studentId, violation, guard, timestamp];
  violation.includes(`"`)
    ? randomData = randomData.map(data => `'${data}'`)
    : randomData = randomData.map(data => `"${data}"`)

  return randomData;
}

const amountOfData = 8192;


setTimeout(() => {
  for (let i = 0; i < amountOfData; i++) {
    let randomData = getRandomData();

    if (i === amountOfData - 1) {
      sql += `(${randomData.join(', ')})`
    } else {
      sql += `(${randomData.join(', ')}), `
    }
  }

  db.run(sql, (err) => {
    if (err) {
      console.log(err)
    }
  });
}, 4000);

