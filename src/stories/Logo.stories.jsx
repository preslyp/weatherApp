import Logo from "../components/Logo";

export default {
  component: Logo,
};

const Template = ({ ...args }) => {
  return <Logo {...args} />;
};

export const Basic = {
  render: Template,
};
