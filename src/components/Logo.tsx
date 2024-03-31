import { cn } from "../lib/utils";
import logo from "/images/logo.svg";

const Logo = ({ className }: Props): JSX.Element => {
  return (
    <img src={logo} alt="WeatherScan" className={cn("h-20 w-40", className)} />
  );
};

interface Props {
  className?: string;
}

export default Logo;
