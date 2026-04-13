"use client";

import { useEffect, useState } from "react";

type FloorPlan = {
    label: string;
    price: string;
};

type Project = {
    floorPlans: FloorPlan[];
};

export default function MortgageCalculator({
    project,
}: {
    project: Project;
}) {
    const [selectedUnit, setSelectedUnit] = useState(
        project?.floorPlans?.[0]?.label || "",
    );

    const getNumericPrice = (value: string) => {
        const cleaned = value.replace(/[^0-9.]/g, "");
        const num = Number(cleaned);

        if (!num) return 0;
        if (/m/i.test(value)) return Math.round(num * 1000000);
        if (/k/i.test(value)) return Math.round(num * 1000);

        return Math.round(num);
    };

    const selectedUnitPlan =
        project?.floorPlans?.find((item) => item.label === selectedUnit) ||
        project?.floorPlans?.[0];

    const [propertyPrice, setPropertyPrice] = useState(
        selectedUnitPlan?.price ? getNumericPrice(selectedUnitPlan.price) : 2300000,
    );
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [interestRate, setInterestRate] = useState(3.5);
    const [loanYears, setLoanYears] = useState(25);

    useEffect(() => {
        if (selectedUnitPlan?.price) {
            setPropertyPrice(getNumericPrice(selectedUnitPlan.price));
        }
    }, [selectedUnitPlan]);

    const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
    const amountFinanced = propertyPrice - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanYears * 12;

    const monthlyPayment =
        monthlyRate > 0
            ? (amountFinanced *
                (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
            (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
            : amountFinanced / Math.max(numberOfPayments, 1);

    const annualCost = monthlyPayment * 12;
    const totalMortgagePaid = monthlyPayment * numberOfPayments;
    const totalInterestPaid = totalMortgagePaid - amountFinanced;
    const totalCost = downPaymentAmount + totalMortgagePaid;

    return (
        <section className="max-w-7xl mx-auto px-4 md:px-10 mt-6 md:mt-8 relative z-20">
            <div className="space-y-6">
                <div className="relative overflow-hidden rounded-[36px] border border-yellow-500/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.08),transparent_24%)]" />

                    <div className="relative z-10 px-5 md:px-8 lg:px-10 py-6 md:py-8">
                        <div className="grid xl:grid-cols-[0.85fr_1.15fr] gap-8 xl:gap-10">
                            <div className="rounded-[28px] border border-white/10 bg-black/25 p-5 md:p-7">
                                <div className="mb-8">
                                    <label className="block text-sm font-medium text-white-300 mb-3">
                                        Select Unit
                                    </label>

                                    <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-4">
                                        <select
                                            value={selectedUnit}
                                            onChange={(e) => setSelectedUnit(e.target.value)}
                                            className="w-full bg-transparent text-white text-lg outline-none"
                                        >
                                            {project.floorPlans.map((plan) => (
                                                <option
                                                    key={plan.label}
                                                    value={plan.label}
                                                    className="bg-[#111111] text-white"
                                                >
                                                    {plan.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <PremiumCalcInput
                                        label="Property Value"
                                        value={propertyPrice}
                                        onChange={(value) => setPropertyPrice(Number(value) || 0)}
                                    />
                                    <PremiumCalcInput
                                        label="Down Payment %"
                                        value={downPaymentPercent}
                                        onChange={(value) =>
                                            setDownPaymentPercent(Number(value) || 0)
                                        }
                                    />
                                    <PremiumCalcInput
                                        label="Term (Years)"
                                        value={loanYears}
                                        onChange={(value) => setLoanYears(Number(value) || 0)}
                                    />
                                    <PremiumCalcInput
                                        label="Interest Rate %"
                                        value={interestRate}
                                        step="0.1"
                                        onChange={(value) => setInterestRate(Number(value) || 0)}
                                    />
                                </div>
                            </div>

                            <div className="rounded-[28px] border border-yellow-500/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5 md:p-7">
                                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.22em] text-yellow-400 mb-2">
                                            Financial Estimate
                                        </p>
                                        <h3 className="text-2xl md:text-3xl font-semibold text-white">
                                            Mortgage Overview
                                        </h3>
                                    </div>

                                    <div className="text-left md:text-right">
                                        <p className="text-sm uppercase tracking-[0.15em] text-white-400 mb-1">
                                            Property Value
                                        </p>
                                        <p className="text-2xl md:text-3xl font-semibold leading-none text-transparent bg-clip-text bg-[linear-gradient(84deg,#B9A650,#F1DC7F,#7C5700)]">
                                            AED {formatAED(propertyPrice)}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4 mb-8">
                                    <PremiumResultCard
                                        title="Total Cost"
                                        value={formatAED(totalCost)}
                                        suffix="AED"
                                    />
                                    <PremiumResultCard
                                        title="Mortgage Payment"
                                        value={formatAED(monthlyPayment)}
                                        suffix="AED /Month"
                                        highlighted
                                    />
                                    <PremiumResultCard
                                        title="Annual Cost"
                                        value={formatAED(annualCost)}
                                        suffix="AED /Year"
                                    />
                                </div>

                                <div className="rounded-[24px] border border-white/10 bg-black/25 p-5 md:p-6 space-y-5">
                                    <PremiumBreakdownRow
                                        label="Down Payment"
                                        value={`AED ${formatAED(downPaymentAmount)}`}
                                    />
                                    <PremiumBreakdownRow
                                        label="Amount Financed"
                                        value={`AED ${formatAED(amountFinanced)}`}
                                    />
                                    <PremiumBreakdownRow
                                        label="Total Interest Paid"
                                        value={`AED ${formatAED(totalInterestPaid)}`}
                                    />
                                    <div className="border-t border-white/10 pt-5">
                                        <PremiumBreakdownRow
                                            label="Total Cost"
                                            value={`AED ${formatAED(totalCost)}`}
                                            bold
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PremiumCalcInput({
    label,
    value,
    onChange,
    step,
}: {
    label: string;
    value: string | number;
    onChange: (value: string) => void;
    step?: string;
}) {
    return (
        <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
            <label className="block text-sm text-white-400 mb-2">{label}</label>
            <input
                type="number"
                value={value}
                step={step}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent text-xl font-medium text-white outline-none"
            />
        </div>
    );
}

function PremiumResultCard({
    title,
    value,
    suffix,
    highlighted = false,
}: {
    title: string;
    value: string;
    suffix: string;
    highlighted?: boolean;
}) {
    return (
        <div
            className={`rounded-[24px] border p-5 min-h-[150px] flex flex-col justify-between ${highlighted
                    ? "border-yellow-400/25 bg-[linear-gradient(180deg,rgba(250,204,21,0.08),rgba(255,255,255,0.02))] shadow-[0_10px_30px_rgba(250,204,21,0.08)]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
        >
            <p className="text-sm text-white-400">{title}</p>
            <div>
                <p className="text-xl md:text-2xl font-semibold text-white leading-tight">
                    {value}
                </p>
                <p className="mt-2 text-base font-medium text-white-300">{suffix}</p>
            </div>
        </div>
    );
}

function PremiumBreakdownRow({
    label,
    value,
    bold = false,
}: {
    label: string;
    value: string;
    bold?: boolean;
}) {
    return (
        <div className="flex items-center justify-between gap-5">
            <p
                className={
                    bold
                        ? "text-md md:text-lg font-semibold text-white"
                        : "text-base text-white-300"
                }
            >
                {label}
            </p>
            <p
                className={
                    bold
                        ? "text-md md:text-lg font-semibold text-yellow-400"
                        : "text-base font-medium text-white"
                }
            >
                {value}
            </p>
        </div>
    );
}

function formatAED(value: number) {
    if (!Number.isFinite(value)) return "0";
    return Math.round(value).toLocaleString("en-AE");
}