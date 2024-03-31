import { Link } from "react-router-dom";
import MaxWidthWrapper from "../pages/MaxWidthPageWrapper";
import Logo from "./Logo";
import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { AppConstants } from "../constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const { STANDARD, METRIC, IMPERIAL } = AppConstants.metrics;

const metricOptions = [
  { id: "1", value: STANDARD },
  { id: "2", value: METRIC },
  { id: "3", value: IMPERIAL },
];

const Header = (): JSX.Element => {
  const {
    appState: { unit },
    handleMetricChange,
  } = useContext(AppContext)!;

  /**
   * Renders the label for a select input based on the provided unit type.
   * @param unit The unit type ('standard', 'metric', or 'imperial').
   * @returns The corresponding label for the unit type.
   */
  const renderSelectLabel = useMemo(() => {
    const renderLabel = (unit: string): string => {
      switch (unit) {
        case STANDARD:
          return "Kelvin";
        case METRIC:
          return "Celsius";
        case IMPERIAL:
          return "Fahrenheit";
        default:
          console.warn(
            `Invalid type provided: ${unit}. The type should be one of these values: ${[STANDARD, METRIC, IMPERIAL].join(", ")}`,
          );
          return "";
      }
    };

    return renderLabel;
  }, []);

  return (
    <header>
      <MaxWidthWrapper>
        <nav className="mx-4 flex items-center justify-between lg:mx-0">
          <Link to="/">
            <Logo />
          </Link>
          <Select
            onValueChange={(value) => handleMetricChange(value)}
            data-cy-id="select-metric"
          >
            <SelectTrigger className="w-[120px]" data-cy-id="metrics-btn">
              <SelectValue placeholder={renderSelectLabel(unit || IMPERIAL)} />
            </SelectTrigger>
            <SelectContent>
              {metricOptions.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.value}
                  data-cy-id={item.value}
                >
                  {renderSelectLabel(item.value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </nav>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
