const db = require('./connect.js');

const violationsDesc = [
  { number: "0.1", isMajor: 0, violation: `Wearing flat shoes` },
  { number: "0.2", isMajor: 0, violation: `Wearing PE uniform` },
  { number: "0.3", isMajor: 0, violation: `Wearing white socks` },
  { number: "0.4", isMajor: 0, violation: `Colored undershirt` },
  { number: "0.5", isMajor: 0, violation: `Wearing freestyle clothing` },
  { number: "0.6", isMajor: 0, violation: `Not wearing sando for women` },
  { number: "8.1", isMajor: 0, violation: `Colored hair aside from black color, highlights` },
  { number: "8.2", isMajor: 0, violation: `Shaved hairline for male, male with "pusod" or pony tails` },
  { number: "8.3", isMajor: 0, violation: `Folded sleeves of school uniforms or t shirts, blouses, polo shirts` },
  { number: "8.4", isMajor: 0, violation: `Making excessive noise or loud talking in the classroom, library, halls and corridors or making boisterous laughter and screaming within the school premise` },
  { number: "8.5", isMajor: 0, violation: `Eating inside the classroom, laboratories, chapel or in any designated non- eating areas` },
  { number: "8.6", isMajor: 0, violation: `Spitting on the grounds, classrooms or corridors` },
  { number: "8.7", isMajor: 0, violation: `Undue disturbance of one's class or that of another` },
  { number: "8.8", isMajor: 0, violation: `Unauthorized use and/or failure to turn-off cellular phones and other similar communication gadgets or electronic devices during classes, seminars/forum or any school activity` },
  { number: "8.9", isMajor: 0, violation: `Use of cellular phones during Holy Mass causing disturbance in the solemnity of the celebration` },
  { number: "8.10", isMajor: 0, violation: `Use of earpiece or headsets while walking along corridors or stairways and during class hours` },
  { number: "8.11", isMajor: 0, violation: `Selling tickets or soliciting contributions and selling commodities inside the school campus without clearance from proper authorities` },
  { number: "8.12", isMajor: 0, violation: `Acts which disturb the peace and order of the school unless properly classified as major offense (case of quarrelling like teasing, bullying, having a shouting match)` },
  { number: "8.13", isMajor: 0, violation: `Wearing caps inside or within any building i.e. classroom, chapel, corridors, canteen and formed assemblies` },
  { number: "8.14", isMajor: 0, violation: `Non-presentation of school I.D. within the campus upon request by a security office/ guard or any member of the school personnel` },
  { number: "8.15", isMajor: 0, violation: `Loitering on corridors during class hours/ at any time` },
  { number: "8.16", isMajor: 0, violation: `Non-submission of excuse slips or letters of excuse when required` },
  { number: "8.17", isMajor: 0, violation: `Unauthorized charging of laptops, cellular phones and other electronic gadgets inside the classroom` },
  { number: "1.1", isMajor: 1, violation: `Unauthorized or illegal possession of controlled substances` },
  { number: "1.2", isMajor: 1, violation: `Bringing and/or drinking liquor or alcoholic beverages` },
  { number: "1.3", isMajor: 1, violation: `Carrying or possession of firearms, deadly weapons and explosives within the school premises` },
  { number: "1.4", isMajor: 1, violation: `Computer hacking` },
  { number: "1.5", isMajor: 1, violation: `Engaging in any action, deliberately or resulting from gross negligence that might lead to serious injury or loss of life of the self or another person` },
  { number: "2.1", isMajor: 1, violation: `Gross acts of disrespect, in words or in deeds, which tend to insult or subject to public ridicule or contempt any member of the administration, faculty, personnel, students, and security` },
  { number: "2.2", isMajor: 1, violation: `Involvement in any form of attack to another person` },
  { number: "2.3", isMajor: 1, violation: `Proselytizing against and/or maligning the Catholic Church, her teachings and practices` },
  { number: "2.4", isMajor: 1, violation: `Cyber bullying` },
  { number: "2.5", isMajor: 1, violation: `Posting indecent pictures or videos either of one self or of others through the social media` },
  { number: "2.6", isMajor: 1, violation: `Posting of vulgar, profane, libelous, and cursing words in the social media against the image of the school or any administrator, personnel or student` },
  { number: "2.7", isMajor: 1, violation: `Creating a fake/troll account in the social media to impersonate an administrator or any student or personnel` },
  { number: "3.1", isMajor: 1, violation: `Vandalism in any form and/or deliberate destruction of school property or any property belonging to any member of the administration, faculty, support staff or visitors` },
  { number: "3.2", isMajor: 1, violation: `Engaging in activities that result i the damages of school properties` },
  { number: "3.3", isMajor: 1, violation: `Stealing signages` },
  { number: "3.4", isMajor: 1, violation: `Theft of school, personnel, visitors or fellow students' property or attempts to do such criminal acts` },
  { number: "4.1", isMajor: 1, violation: `Deliberate disruption, obstruction, or interference of the normal functioning of classes, school offices, or any recognized school activities that tend to create disorder or disturbance` },
  { number: "4.2", isMajor: 1, violation: `Membership in any unrecognized association/organization or fraternity/sorority/gang` },
  { number: "4.3", isMajor: 1, violation: `Smoking within the school premises or approved off-campus activities or in public places while in school uniform, including e-cigarettes` },
  { number: "4.4", isMajor: 1, violation: `Any forms of gambling within the school premises or outside in school uniform` },
  { number: "4.5", isMajor: 1, violation: `Acts that malign the good name and reputation of the school and its duly constituted authority such as public and malicious imputation of a crime, vice or defect whether real or imaginary, or of any act, omission, condition, status or circumstances tending to discredit or cause dishonor or contempt to the name or reputation of the school` },
  { number: "4.6", isMajor: 1, violation: `Bribery or acceptance of a bribe, or any act meant to give or obtain favor, or advantage illegally or unfairly, whether attempted, frustrated or consummated` },
  { number: "4.7", isMajor: 1, violation: `Committing acts outside the campus which affect the good name, order or welfare of the school or have direct and immediate effect on the discipline, morale or general welfare of the school, including those through the social media, electronic means, especially acts considered crimes under the laws of the land of which a person has been formally charged or convicted` },
  { number: "4.8", isMajor: 1, violation: `Habitual disregard or willful violation of established policies and regulations` },
  { number: "4.9", isMajor: 1, violation: `Willfully disregarding sanctions within the prescribed period given by Student Development Office or  decisions by the Peace Committee` },
  { number: "5.1", isMajor: 1, violation: `Any form of dishonesty committed in the context of an academic exercise` },
  { number: "5.2", isMajor: 1, violation: `Forging/Tampering with and/or falsifying academic or official records, notices on bulletin boards` },
  { number: "5.3", isMajor: 1, violation: `Unauthorized distribution or display of printed materials which do not carry the name of the author or sponsor, endorsing, attaching or inserting unauthorized materials in school publications` },
  { number: "5.4", isMajor: 1, violation: `Unauthorized use of school equipment, fixtures and facilities` },
  { number: "5.5", isMajor: 1, violation: `Committing any form of misrepresentation` },
  { number: "6.1", isMajor: 1, violation: `Pregnancy out of wedlock also applies to the male student who impregnates any woman out of wedlock` },
  { number: "6.2", isMajor: 1, violation: `Acts of immorality i.e. premarital sex, extra marital sex, abortion, co-habiting without the benefit of marriage` },
  { number: "6.3", isMajor: 1, violation: `Engaging in prostitution or employment in immoral establishments, acts of conduct and relationships which are contrary to the laws, principles and morale adhered to by the school and the teachings of the Catholic Church` },
  { number: "6.4", isMajor: 1, violation: `Public display of intimate gestures of affection inside or outside the school while wearing the school uniform which constitute obscene and immoral conduct and/or causing scandal to the public` },
  { number: "6.5", isMajor: 1, violation: `Posting indecent pictures/photos/videos through the social/print/electronic media–e.g. Internet, smart phones, Facebook/Instagram and the like which are contrary to the core values adhered to by the school and the teachings of the Catholic Church` },
  { number: "6.6", isMajor: 1, violation: `Accessing, possessing, preparing, publishing, displaying, or distributing in any form (printed, physical or electronic) of pornographic, obscene, libelous or subversive materials inside and outside the school premises` },
  { number: "7.1", isMajor: 1, violation: `Serious negligence of patient resulting to injury or death` },
  { number: "7.2", isMajor: 1, violation: `Smoking and drinking alcoholic drinks in beer garden or bar` },
  { number: "7.3", isMajor: 1, violation: `Bringing in or selling cigarettes within the school premises` },
];

let sql = "INSERT INTO ViolationsDesc (Number, Violation, IsMajor) VALUES ";

violationsDesc.forEach((desc, index) => {
  const number = `"${desc.number}"`;
  const isMajor = desc.isMajor;

  let violation = `"${desc.violation}"`;
  if (desc.violation.includes(`"`)) violation = `'${desc.violation}'`;

  const violationDesc = [number, violation, isMajor];

  if (index === violationsDesc.length - 1) {
    sql += `(${violationDesc.join(', ')})`
  } else {
    sql += `(${violationDesc.join(', ')}), `
  }
})

db.run(sql, (err) => {
  if (err) {
    console.log(err)
  }
});
