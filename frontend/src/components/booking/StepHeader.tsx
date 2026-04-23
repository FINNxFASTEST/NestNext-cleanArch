import { cn } from "@/lib/utils";
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
            className={cn("flex items-center gap-2.5", currentStep >= i + 1 ? "opacity-100" : "opacity-40")}
          >
            {/* Circle */}
            <div
              className={cn(
                "w-7 h-7 rounded-full grid place-items-center text-[13px] font-serif",
                currentStep > i + 1
                  ? "bg-forest-700 text-cream-50"
                  : currentStep === i + 1
                  ? "bg-ember text-cream-50"
                  : "bg-cream-100 text-sage-500"
              )}
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
          {i < 2 && <div className="h-px w-10 mx-3 bg-line-strong" />}
        </div>
      ))}
    </div>
  );
}
