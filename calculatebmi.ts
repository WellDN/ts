//Write function bmi that calculates body mass index (bmi = weight / height2).

function bmi (weight: number, height: number): string {

let bmi = weight / height ** 2;
  switch (true) {
    case (bmi <= 18.5):
      return 'Underweight';
      break;
    case (bmi <= 25):
      return 'Normal'
      break;
    case (bmi <= 30.0):
      return "Overweight";
      break;
    case (bmi > 30):
      return 'Obese';
      break;
    default:
      return 'other';
      break;
  }
}