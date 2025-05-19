export const PageHeader = ({text}:{text: string}) => {
    return (
      <p className="lg:text-2xl text-lg font-work-sans-medium  lg:font-work-sans-semi-bold">
        {text}
      </p>
    );

}