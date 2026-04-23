import { CheckIcon } from "@/components/common/Icons";

const STEPS = ["วันที่", "รายละเอียด", "ชำระเงิน"];

interface StepHeaderProps {
  currentStep: number;
}

export function StepHeader({ currentStep }: StepHeaderProps) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center">
          <div
            className="flex items-center gap-2.5"
            style={{ opacity: currentStep >= i + 1 ? 1 : 0.4 }}
          >
            {/* Circle */}
            <div
              className="w-7 h-7 rounded-full grid place-items-center text-[13px] font-serif"
              style={{
                background:
                  currentStep > i + 1
                    ? "#2F4034"
                    : currentStep === i + 1
                    ? "#C97B4A"
                    : "var(--cream-100)",
                color:
                  currentStep >= i + 1 ? "#F7F2E7" : "#7C8F6F",
              }}
            >
              {currentStep > i + 1 ? (
                <CheckIcon style={{ width: 14, height: 14 }} />
              ) : (
                i + 1
              )}
            </div>
            <span className="font-thai text-sm">{label}</span>
          </div>
          {/* Connector */}
          {i < 2 && (
            <div
              className="h-px mx-3"
              style={{ width: 40, background: "var(--line-strong)" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
