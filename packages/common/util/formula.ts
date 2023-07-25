export const getArmourDR = function (attack, armour) {
  if (attack <= 0) return 0
  return armour / (armour + 5 * attack)
}
