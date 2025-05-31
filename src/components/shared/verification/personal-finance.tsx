import { useEffect, useState } from "react";
import arrowDown from "@/assets/svgs/arrow-down-black.svg";
import arrowRightBlack from "@/assets/svgs/arrow-right-small.svg";
import { SettingsInput } from "@/components/ui/inputs/settings-input";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FadeIn } from "@/animation/fade-in";
import { Button } from "@/components/ui/buttons/button";
import chevroletWhite from "@/assets/svgs/chevron-right-white.svg";
import checkedBox from "@/assets/svgs/checked-square.svg";
import unCheckedBox from "@/assets/svgs/unchecked-square.svg";
import { VerificationIdtype } from "@/interfaces/ui-interfac";
import { resolve } from "path";

export const PersonalFinanceVerification = ({
  id,
  resolveNextStatus,
}: {
  id: VerificationIdtype;
  resolveNextStatus: (val: VerificationIdtype) => void;
}) => {
  const [currentWidth, setCurrentWidth] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  const widthPercent = activeStep === 11 ? 100 : currentWidth;

  useEffect(() => {
    // Get the number of steps we have
    if(activeStep > 1){
        const highestNoOfSteps = 11;
        const unitIncrease = Math.ceil(100 / highestNoOfSteps);
        setCurrentWidth(currentWidth + unitIncrease);
    }
 
  }, [activeStep]);

  const getIndicatorOffset = () => {
    if (widthPercent > 90) return "10px";
    if (widthPercent < 10) return "-34px";
    return "-22px";
  };

  return (
    <div className="mt-8">
      <div className="bg-[#0DAE941A]  h-2 rounded-full mt-2">
        <motion.div
          initial={{ width: "0%" }}
          style={{ width: `${activeStep === 11 ? 100 : currentWidth}%` }}
          animate={{ width: `${widthPercent}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-[#0DAE94] h-full rounded-full relative"
        >
          <motion.div
            animate={{ right: getIndicatorOffset() }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              right: `${
                currentWidth > 90
                  ? "10px"
                  : currentWidth < 10
                  ? "-34px"
                  : "-22px"
              }`,
              top: "-32px",
              position: "absolute",
            }}
            className="flex"
          >
            <div className="border  bg-[#E7F7F4] p-1 rounded-lg  border-[#0DAE9499]">
              <motion.p
                key={widthPercent}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[#0DAE94] text-xs"
              >
                {activeStep === 11 ? 100 : Math.ceil(currentWidth)}%
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* This baseically shows the steps we have  */}
      <div className="mt-2">
        <AnimatePresence>
          {activeStep === 1 && (
            <FadeIn>
              <StepOne activeStep={activeStep} setActiveStep={setActiveStep} />
            </FadeIn>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeStep === 2 && (
            <FadeIn>
              <StepTwo activeStep={activeStep} setActiveStep={setActiveStep} />
            </FadeIn>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeStep === 3 && (
            <FadeIn>
              <StepThree
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </FadeIn>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeStep === 4 && (
            <FadeIn>
              <StepFour activeStep={activeStep} setActiveStep={setActiveStep} />
            </FadeIn>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeStep === 5 && (
            <FadeIn>
              <StepFive activeStep={activeStep} setActiveStep={setActiveStep} />
            </FadeIn>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeStep === 6 && (
            <FadeIn>
              <StepSix activeStep={activeStep} setActiveStep={setActiveStep} />
            </FadeIn>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeStep === 7 && (
            <FadeIn>
              <StepSeven
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </FadeIn>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeStep === 8 && (
            <FadeIn>
              <StepEight
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </FadeIn>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeStep === 9 && (
            <FadeIn>
              <StepNine activeStep={activeStep} setActiveStep={setActiveStep} />
            </FadeIn>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeStep === 10 && (
            <FadeIn>
              <StepTen activeStep={activeStep} setActiveStep={setActiveStep} />
            </FadeIn>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {activeStep === 11 && (
            <FadeIn>
              <StepEleven
                resolveNextStatus={resolveNextStatus}
                id={id}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </FadeIn>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StepEleven = ({
  activeStep,
  setActiveStep,
  resolveNextStatus,
  id,
}: {
  activeStep: number;
  setActiveStep: (val: number) => void;
  resolveNextStatus: (val: VerificationIdtype) => void;
  id: VerificationIdtype;
}) => {
  return (
    <div className="">
      <div>
        <StepHeader text="Before You Begin Trading, Please Acknowledge the Following" />
        <p className="font-work-sans-regular text-[#707070]">
          We want to make sure you're fully informed before you begin. Trading
          involves risk, and it's important to understand how it might affect
          your finances. Please confirm that you’re aware of the key points
          below:
        </p>
      </div>
      <div className="mt-3 bg-white rounded-lg p-4">
        <div className="flex gap-4 mb-8">
          <span className="flex ">
            <Image src={checkedBox} alt="" />
          </span>
          <div className="font-work-sans-regular">
            <p className="text-base text-[#111111] font-work-sans-medium">
              I Confirm i have reviewed important trading information
            </p>
            <p className="mt-1 text-xs text-[#404040]">
              (This includes risk disclosures, platform terms, and educational
              resources. I understand I can use a demo account to practice.)
            </p>
          </div>
        </div>
        <div className="flex gap-4 mb-8">
          <span className="flex ">
            <Image src={checkedBox} alt="" />
          </span>
          <div className="font-work-sans-regular">
            <p className="text-base text-[#111111] font-work-sans-medium">
              I understand the risk of leveraged products
            </p>
            <p className="mt-1 text-xs text-[#404040]">
              (CFDs and similar instruments can amplify both gains and losses.
              There is a risk I may lose more than I deposit.)
            </p>
          </div>
        </div>
        <div className="flex gap-4 mb-8">
          <span className="flex ">
            <Image src={checkedBox} alt="" />
          </span>
          <div className="font-work-sans-regular">
            <p className="text-base text-[#111111] font-work-sans-medium">
              I acknowledge i am trading at my own risk
            </p>
            <p className="mt-1 text-xs text-[#404040]">
              (I have considered my financial situation and risk tolerance, and
              I choose to proceed with real trading knowingly.)
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            loading={false}
            action={() => {
              resolveNextStatus(id);
            }}
            text="Proceed"
            variant="green-bg"
            icon={chevroletWhite}
            iconPosition="right"
          />
        </div>
      </div>
    </div>
  );
};

const StepTen = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (val: number) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const stepList = [
    "Currencies (e.g. Forex pairs)",
    "Cryptocurrencies (Bitcoin, Ethereum, etc.)",
    "Commodities (Oil, Natural Gas, Gold, etc.)",
    "Precious Metals (Gold, Silver, Platinum, etc.)",
    "Stocks (Apple, Tesla, etc.)",
    "Indices (S&P 500, Nasdaq, etc.)",
    "ETFs (Exchange-Traded Funds)",
    "Synthetic assets / Derivatives",
    "Not sure yet (exploring options)",
  ];
  return (
    <>
      <StepHeader text="Trading Instruments of Interest" />
      <div className="bg-white p-4 rounded-lg mt-4">
        {stepList.map((item) => {
          return (
            // Set the correct value here too , liek the value selected
            <StepContentWithCheckbox
              clickHandler={() => setActiveStep(11)}
              text={item}
            />
          );
        })}
        <div className="text flex justify-end mt-4">
          <Button
            loading={false}
            action={() => {
              setActiveStep(11);
            }}
            text="Proceed"
            variant="green-bg"
            icon={chevroletWhite}
            iconPosition="right"
          />
        </div>
      </div>
    </>
  );
};

const StepNine = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (val: number) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const stepList = [
    "Long-term investment",
    "Short-term trading/speculation",
    "Savings",
    "Wealth preservation",
    "Income generation",
  ];
  return (
    <>
      <StepHeader text="What is the primary purpose of your account?" />
      <div className="bg-white p-4 rounded-lg mt-4">
        {stepList.map((item) => {
          return (
            // Set the correct value here too , liek the value selected
            <StepContent clickHandler={() => setActiveStep(10)} text={item} />
          );
        })}
        <OthersSpecify
          setValue={setSelectedValue}
          value={selectedValue}
          proceedHandler={() => setActiveStep(10)}
        />
      </div>
    </>
  );
};

const StepEight = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (val: number) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const stepList = [
    "Less than $5,000",
    "$5,001 – $20,000",
    "$20,001 – $50,000",
    "$50,001 – $100,000",
    "$3,001 – $5,000",
    "Over $100,000",
  ];
  return (
    <>
      <StepHeader text="How much do you invest annually on average?" />
      <div className="bg-white p-4 rounded-lg mt-4">
        {stepList.map((item) => {
          return (
            // Set the correct value here too , liek the value selected
            <StepContent clickHandler={() => setActiveStep(9)} text={item} />
          );
        })}
      </div>
    </>
  );
};

const StepSeven = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (val: number) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const stepList = [
    "Less than $500",
    "$500 – $1,000",
    "$1,001 – $3,000",
    "$50,001 – $100,000",
    "$3,001 – $5,000",
    "Over $5,000",
  ];
  return (
    <>
      <StepHeader text="What are your average monthly financial obligations?" />
      <div className="bg-white p-4 rounded-lg mt-4">
        {stepList.map((item) => {
          return (
            // Set the correct value here too , liek the value selected
            <StepContent clickHandler={() => setActiveStep(8)} text={item} />
          );
        })}
      </div>
    </>
  );
};

const StepSix = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (val: number) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const stepList = [
    "Less than $1,000",
    "$10,000 – $25,000",
    "$25,001 – $50,000",
    "$50,001 – $100,000",
    "$100,001 – $250,000",
    "Over $250,000",
  ];
  return (
    <>
      <StepHeader text="What is your estimated annual income?" />
      <div className="bg-white p-4 rounded-lg mt-4">
        {stepList.map((item) => {
          return (
            // Set the correct value here too , liek the value selected
            <StepContent clickHandler={() => setActiveStep(7)} text={item} />
          );
        })}
      </div>
    </>
  );
};

const StepFive = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (val: number) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const stepList = [
    "Less than $1,000",
    "$1,000 – $10,000",
    "$10,001 – $50,000",
    "$50,001 – $100,000",
    "$100,001 – $500,000",
    "Over $500,000",
  ];
  return (
    <>
      <StepHeader text="What is your estimated net capital?" />
      <div className="bg-white p-4 rounded-lg mt-4">
        {stepList.map((item) => {
          return (
            // Set the correct value here too , liek the value selected
            <StepContent clickHandler={() => setActiveStep(6)} text={item} />
          );
        })}
      </div>
    </>
  );
};

const StepFour = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (val: number) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const stepList = [
    "Salary / Wages",
    "Business Income",
    "Freelance / Contract Work",
    "Savings",
    "Pension / Retirement Income",
    "Investment Income (e.g. stocks, crypto, dividends)",
    "Rental Income",
    "Family Support / Allowance",
    "Government Benefits / Grants",
    "Gift / Inheritance",
    "Loan / Credit Facility",
  ];
  return (
    <>
      <StepHeader text="What is your primary source of funds?" />
      <div className="bg-white p-4 rounded-lg mt-4">
        {stepList.map((item) => {
          return (
            // Set the correct value here too , liek the value selected
            <StepContentWithCheckbox
              clickHandler={() => setActiveStep(2)}
              text={item}
            />
          );
        })}
        <OthersSpecify
          proceedHandler={() => {
            setActiveStep(5);
          }}
          setValue={setSelectedValue}
          value={selectedValue}
          opened
        />
      </div>
    </>
  );
};

const StepThree = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (val: number) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const stepList = [
    "No Formal Education",
    "Primary School",
    "Vocational / Technical Training",
    "Diploma / OND",
    "Higher National Diploma (HND)",
    "Bachelor’s Degree (B.Sc, B.A)",
    "Postgraduate Diploma",
    "Remote Worker",
    "Unemployed",
    "Master’s Degree (M.Sc, M.A, MBA)",
    "Doctorate / PhD",
  ];
  return (
    <>
      <StepHeader text="Indicate your highest level of education" />
      <div className="bg-white p-4 rounded-lg mt-4">
        {stepList.map((item) => {
          return (
            // Set the correct value here too , liek the value selected
            <StepContent clickHandler={() => setActiveStep(4)} text={item} />
          );
        })}
      </div>
    </>
  );
};

const StepTwo = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (val: number) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const stepList = [
    "Banking & Financial Services",
    "Insurance",
    "Investment Management",
    "Business Owner",
    "Accounting / Bookkeeping",
    "E-commerce",
    "Wholesale Distribution",
    "Building & Construction",
    "Architecture & Interior Design",
    "Facility Services",
    "Software Development",
    "IT Services / Consulting",
    "Data Analytics",
    "Restaurant / Food Services",
    "Hotel / Lodging",
    "Hospital / Clinic",
    "Pharmacy",
    "Health Consultancy",
    "Private Tutoring",
    "Advertising / Marketing",
    "Automotive Parts",
    "Consulting",
    "Influencer / Creator",
  ];
  return (
    <>
      <StepHeader text="How would you describe your nature of business?" />
      <div className="bg-white p-4 rounded-lg mt-4">
        {stepList.map((item) => {
          return (
            // Set the correct value here too , liek the value selected
            <StepContent clickHandler={() => setActiveStep(3)} text={item} />
          );
        })}
        <OthersSpecify
          proceedHandler={() => {
            setActiveStep(3);
          }}
          setValue={setSelectedValue}
          value={selectedValue}
        />
      </div>
    </>
  );
};

const StepOne = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (val: number) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const stepList = [
    "Employed Full time",
    "Employed Part time",
    "Freelancer / Self Employed",
    "Business Owner",
    "Student",
    "Contractor / Consultant",
    "Intern / Trainee",
    "Remote Worker",
    "Unemployed",
    "Military / Paramilitary Personnel",
    "Seasonal Worker",
  ];
  return (
    <>
      <StepHeader text="How would you describe your current work situation?" />
      <div className="bg-white p-4 rounded-lg mt-4">
        {stepList.map((item) => {
          return (
            // Set the correct value here too , liek the value selected
            <StepContent clickHandler={() => setActiveStep(2)} text={item} />
          );
        })}
        <OthersSpecify
          proceedHandler={() => {
            setActiveStep(2);
          }}
          setValue={setSelectedValue}
          value={selectedValue}
        />
      </div>
    </>
  );
};

const StepContent = ({
  text,
  clickHandler,
}: {
  text: string;
  clickHandler?: () => void;
}) => {
  return (
    <div
      onClick={clickHandler}
      style={{ borderBottom: "0.5px solid #1F0D3F80" }}
      className="cursor-pointer py-3 px-2"
    >
      <p className="text-[#111111] font-work-sans-regular ">{text}</p>
    </div>
  );
};

const StepContentWithCheckbox = ({
  text,
  clickHandler,
}: {
  text: string;
  clickHandler?: () => void;
}) => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      onClick={() => setChecked((prev) => !prev)}
      style={{ borderBottom: "0.5px solid #1F0D3F80" }}
      className="cursor-pointer flex items-center gap-2 py-3 px-2"
    >
      <Image
        className="w-[16px] h-[16px]"
        src={checked ? checkedBox : unCheckedBox}
        alt=""
      />
      <p className="text-[#111111] font-work-sans-regular ">{text}</p>
    </div>
  );
};
const StepHeader = ({ text }: { text: string }) => {
  return (
    <p className="text-[#111111] font-work-sans-medium text-lg my-4">{text}</p>
  );
};

const OthersSpecify = ({
  proceedHandler,
  setValue,
  value,
  opened,
}: {
  proceedHandler: () => void;
  value: string;
  setValue: (val: string) => void;
  opened?: boolean;
}) => {
  const [showInput, setShowInput] = useState(opened);
  return (
    <div className="py-3 px-2">
      <div
        onClick={() => setShowInput((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer mb-1"
      >
        <Image
          className="w-[16px] h-[16px]"
          src={showInput ? arrowDown : arrowRightBlack}
          alt=""
        />
        <p className="font-work-sans-regular text-[#111111]">
          Others (please specify)
        </p>
      </div>

      <div>
        <AnimatePresence>
          {showInput && (
            <FadeIn>
              <SettingsInput label="" placeholder="specify" readOnly={false} />
              <div className="mt-2 w-full flex justify-end">
                <Button
                  loading={false}
                  action={() => {
                    proceedHandler();
                  }}
                  text="Proceed"
                  variant="green-bg"
                  icon={chevroletWhite}
                  iconPosition="right"
                />
              </div>
            </FadeIn>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
