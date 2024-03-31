import MaxWidthWrapper from "./MaxWidthPageWrapper";
import pageNotFound from "/images/404.svg";

const PageNotFound = ():JSX.Element => {
  return (
    <MaxWidthWrapper>
      <div className="mx-auto flex h-[660px] w-[600px] flex-col items-center gap-8">
        <img src={pageNotFound} alt="Page not found" />
        <h1 className="text-4xl font-semibold text-gray-900">Page not found</h1>
      </div>
    </MaxWidthWrapper>
  );
};

export default PageNotFound;
