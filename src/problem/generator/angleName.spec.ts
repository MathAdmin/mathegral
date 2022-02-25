import { relation, Angle, Pair } from "./angleName";

it("identifies linear pairs", () => {
  expect(relation(Angle.alpha1, Angle.alpha2)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.alpha2, Angle.alpha3)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.alpha3, Angle.alpha4)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.alpha4, Angle.alpha1)).toEqual(Pair.LINEAR_PAIR);

  expect(relation(Angle.beta1, Angle.beta2)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.beta2, Angle.beta3)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.beta3, Angle.beta4)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.beta4, Angle.beta1)).toEqual(Pair.LINEAR_PAIR);

  expect(relation(Angle.gamma1, Angle.gamma2)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.gamma2, Angle.gamma3)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.gamma3, Angle.gamma4)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.gamma4, Angle.gamma1)).toEqual(Pair.LINEAR_PAIR);

  expect(relation(Angle.delta1, Angle.delta2)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.delta2, Angle.delta3)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.delta3, Angle.delta4)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.delta4, Angle.delta1)).toEqual(Pair.LINEAR_PAIR);

  expect(relation(Angle.epsilon1, Angle.epsilon2)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.epsilon2, Angle.epsilon3)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.epsilon3, Angle.epsilon4)).toEqual(Pair.LINEAR_PAIR);
  expect(relation(Angle.epsilon4, Angle.epsilon1)).toEqual(Pair.LINEAR_PAIR);
});

it("identifies vertical", () => {
  expect(relation(Angle.alpha1, Angle.alpha3)).toEqual(Pair.VERTICAL);
  expect(relation(Angle.alpha2, Angle.alpha4)).toEqual(Pair.VERTICAL);

  expect(relation(Angle.beta1, Angle.beta3)).toEqual(Pair.VERTICAL);
  expect(relation(Angle.beta2, Angle.beta4)).toEqual(Pair.VERTICAL);

  expect(relation(Angle.gamma1, Angle.gamma3)).toEqual(Pair.VERTICAL);
  expect(relation(Angle.gamma2, Angle.gamma4)).toEqual(Pair.VERTICAL);

  expect(relation(Angle.delta1, Angle.delta3)).toEqual(Pair.VERTICAL);
  expect(relation(Angle.delta2, Angle.delta4)).toEqual(Pair.VERTICAL);

  expect(relation(Angle.epsilon1, Angle.epsilon3)).toEqual(Pair.VERTICAL);
  expect(relation(Angle.epsilon2, Angle.epsilon4)).toEqual(Pair.VERTICAL);
});

it("identifies corresponding", () => {
  expect(relation(Angle.alpha1, Angle.beta1)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.alpha1, Angle.gamma1)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.alpha2, Angle.beta2)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.alpha2, Angle.gamma2)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.alpha3, Angle.beta3)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.alpha3, Angle.gamma3)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.alpha4, Angle.beta4)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.alpha4, Angle.gamma4)).toEqual(Pair.CORRESPONDING);

  expect(relation(Angle.beta1, Angle.delta1)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.beta2, Angle.delta2)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.beta3, Angle.delta3)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.beta4, Angle.delta4)).toEqual(Pair.CORRESPONDING);

  expect(relation(Angle.gamma1, Angle.delta1)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.gamma2, Angle.delta2)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.gamma3, Angle.delta3)).toEqual(Pair.CORRESPONDING);
  expect(relation(Angle.gamma4, Angle.delta4)).toEqual(Pair.CORRESPONDING);
});

it("identifies alternate", () => {
  expect(relation(Angle.alpha1, Angle.beta3)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.alpha1, Angle.gamma3)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.alpha2, Angle.beta4)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.alpha2, Angle.gamma4)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.alpha3, Angle.beta1)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.alpha3, Angle.gamma1)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.alpha4, Angle.beta2)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.alpha4, Angle.gamma2)).toEqual(Pair.ALTERNATE);

  expect(relation(Angle.beta1, Angle.delta3)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.beta2, Angle.delta4)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.beta3, Angle.delta1)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.beta4, Angle.delta2)).toEqual(Pair.ALTERNATE);

  expect(relation(Angle.gamma1, Angle.delta3)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.gamma2, Angle.delta4)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.gamma3, Angle.delta1)).toEqual(Pair.ALTERNATE);
  expect(relation(Angle.gamma4, Angle.delta2)).toEqual(Pair.ALTERNATE);
});

it("identifies consecutive", () => {
  expect(relation(Angle.alpha1, Angle.beta4)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.alpha1, Angle.gamma2)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.alpha2, Angle.beta3)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.alpha2, Angle.gamma1)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.alpha3, Angle.beta2)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.alpha3, Angle.gamma4)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.alpha4, Angle.beta1)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.alpha4, Angle.gamma3)).toEqual(Pair.CONSECUTIVE);

  expect(relation(Angle.beta1, Angle.delta2)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.beta2, Angle.delta1)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.beta3, Angle.delta4)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.beta4, Angle.delta3)).toEqual(Pair.CONSECUTIVE);

  expect(relation(Angle.gamma1, Angle.delta4)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.gamma2, Angle.delta3)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.gamma3, Angle.delta2)).toEqual(Pair.CONSECUTIVE);
  expect(relation(Angle.gamma4, Angle.delta1)).toEqual(Pair.CONSECUTIVE);
});

it("identifies complementary", () => {
  expect(relation(Angle.alpha1, Angle.epsilon2)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.alpha1, Angle.epsilon4)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.alpha3, Angle.epsilon2)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.alpha3, Angle.epsilon4)).toEqual(Pair.COMPLEMENTARY);

  expect(relation(Angle.beta1, Angle.epsilon2)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.beta1, Angle.epsilon4)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.beta3, Angle.epsilon2)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.beta3, Angle.epsilon4)).toEqual(Pair.COMPLEMENTARY);

  expect(relation(Angle.gamma1, Angle.epsilon2)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.gamma1, Angle.epsilon4)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.gamma3, Angle.epsilon2)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.gamma3, Angle.epsilon4)).toEqual(Pair.COMPLEMENTARY);

  expect(relation(Angle.delta1, Angle.epsilon2)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.delta1, Angle.epsilon4)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.delta3, Angle.epsilon2)).toEqual(Pair.COMPLEMENTARY);
  expect(relation(Angle.delta3, Angle.epsilon4)).toEqual(Pair.COMPLEMENTARY);
});

it("identifies supplementary", () => {
  expect(relation(Angle.alpha1, Angle.beta2)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha1, Angle.delta2)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha1, Angle.delta4)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha1, Angle.gamma4)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha2, Angle.beta1)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha2, Angle.delta1)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha2, Angle.delta3)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha2, Angle.gamma3)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha3, Angle.beta4)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha3, Angle.delta2)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha3, Angle.delta4)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha3, Angle.gamma2)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha4, Angle.beta3)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha4, Angle.delta1)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha4, Angle.delta3)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.alpha4, Angle.gamma1)).toEqual(Pair.SUPPLEMENTARY);

  expect(relation(Angle.beta1, Angle.delta4)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.beta1, Angle.gamma2)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.beta1, Angle.gamma4)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.beta2, Angle.delta3)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.beta2, Angle.gamma1)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.beta2, Angle.gamma3)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.beta3, Angle.delta2)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.beta3, Angle.gamma2)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.beta3, Angle.gamma4)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.beta4, Angle.delta1)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.beta4, Angle.gamma1)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.beta4, Angle.gamma3)).toEqual(Pair.SUPPLEMENTARY);

  expect(relation(Angle.gamma1, Angle.delta2)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.gamma2, Angle.delta1)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.gamma3, Angle.delta4)).toEqual(Pair.SUPPLEMENTARY);
  expect(relation(Angle.gamma4, Angle.delta3)).toEqual(Pair.SUPPLEMENTARY);
});

it("identifies unrelated", () => {
  expect(relation(Angle.alpha1, Angle.delta1)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha1, Angle.delta3)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha1, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha1, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha2, Angle.delta2)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha2, Angle.delta4)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha2, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha2, Angle.epsilon2)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha2, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha2, Angle.epsilon4)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha3, Angle.delta1)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha3, Angle.delta3)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha3, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha3, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha4, Angle.delta2)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha4, Angle.delta4)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha4, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha4, Angle.epsilon2)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha4, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.alpha4, Angle.epsilon4)).toEqual(Pair.NONE);

  expect(relation(Angle.beta1, Angle.gamma1)).toEqual(Pair.NONE);
  expect(relation(Angle.beta1, Angle.gamma3)).toEqual(Pair.NONE);
  expect(relation(Angle.beta1, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.beta1, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.beta2, Angle.gamma2)).toEqual(Pair.NONE);
  expect(relation(Angle.beta2, Angle.gamma4)).toEqual(Pair.NONE);
  expect(relation(Angle.beta2, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.beta2, Angle.epsilon2)).toEqual(Pair.NONE);
  expect(relation(Angle.beta2, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.beta2, Angle.epsilon4)).toEqual(Pair.NONE);
  expect(relation(Angle.beta3, Angle.gamma1)).toEqual(Pair.NONE);
  expect(relation(Angle.beta3, Angle.gamma3)).toEqual(Pair.NONE);
  expect(relation(Angle.beta3, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.beta3, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.beta4, Angle.gamma2)).toEqual(Pair.NONE);
  expect(relation(Angle.beta4, Angle.gamma4)).toEqual(Pair.NONE);
  expect(relation(Angle.beta4, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.beta4, Angle.epsilon2)).toEqual(Pair.NONE);
  expect(relation(Angle.beta4, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.beta4, Angle.epsilon4)).toEqual(Pair.NONE);

  expect(relation(Angle.gamma1, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.gamma1, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.gamma2, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.gamma2, Angle.epsilon2)).toEqual(Pair.NONE);
  expect(relation(Angle.gamma2, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.gamma2, Angle.epsilon4)).toEqual(Pair.NONE);
  expect(relation(Angle.gamma3, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.gamma3, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.gamma4, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.gamma4, Angle.epsilon2)).toEqual(Pair.NONE);
  expect(relation(Angle.gamma4, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.gamma4, Angle.epsilon4)).toEqual(Pair.NONE);

  expect(relation(Angle.delta1, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.delta1, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.delta2, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.delta2, Angle.epsilon2)).toEqual(Pair.NONE);
  expect(relation(Angle.delta2, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.delta2, Angle.epsilon4)).toEqual(Pair.NONE);
  expect(relation(Angle.delta3, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.delta3, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.delta4, Angle.epsilon1)).toEqual(Pair.NONE);
  expect(relation(Angle.delta4, Angle.epsilon2)).toEqual(Pair.NONE);
  expect(relation(Angle.delta4, Angle.epsilon3)).toEqual(Pair.NONE);
  expect(relation(Angle.delta4, Angle.epsilon4)).toEqual(Pair.NONE);
});
