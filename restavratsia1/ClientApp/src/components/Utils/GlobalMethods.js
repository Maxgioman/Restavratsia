import * as Yup from "yup";

export default function addPassConfirmMethod() {
  Yup.addMethod(Yup.mixed, "sameAs", function (ref, message) {
    return this.test("sameAs", message, function (value) {
      const other = this.resolve(ref);
      console.log("other : ", other);
      console.log("value : ", value);
      return !other || !value || value === other;
    });
  });
}
