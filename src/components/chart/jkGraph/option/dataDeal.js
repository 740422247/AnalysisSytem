import { isPlanarArray } from '@views/dragable/echartOption'

export const dealZero = (value, label) => {
  if (!value) return { value, label }
  // eslint-disable-next-line prefer-const
  let l = []
  let resultValue = []
  if (isPlanarArray(value)) {
    resultValue = value.map((item, i) => {
      if (isPlanarArray(value)) {
        return item.filter((v, m) => {
          if (!!v && value.some((a, n) => !!a[n])) {
            !i && l.push(label[m])
            return true
          } else { return false }
        })
      }
    })
  } else {
    resultValue = value.filter((item, index) => {
      if (item) {
        l.push(label[index]);
        return true
      } else {
        return false
      }
    })
  }
  return { value: resultValue, label: l }
}
