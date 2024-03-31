import MaxWidthWrapper from "../pages/MaxWidthPageWrapper";
import Logo from "./Logo";

const Footer = (): JSX.Element => {
  return (
    <footer className="mx-4 mt-auto lg:mx-0">
      <MaxWidthWrapper>
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center gap-2">
            <Logo className="h-10 w-28" />
            <span className="pt-1 text-xs text-gray-900">&copy;</span>
            <span className="pt-1 text-xs text-gray-900">
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
