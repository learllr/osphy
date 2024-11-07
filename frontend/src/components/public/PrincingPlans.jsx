"use client";

import React, { useState } from "react";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import Body from "../common/Body.jsx";

export default function PricingPlans({ planType }) {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: "classic",
      title: "Formule Classique",
      description: "Accédez aux fonctionnalités de base",
      monthlyPrice: "19€",
      yearlyPrice: "15€",
      features: [
        "Accès aux fonctionnalités de base",
        "Suivi des patients",
        "Gestion de l'agenda",
        "Assistance par email",
      ],
    },
    {
      id: "premium",
      title: "Formule Premium",
      description:
        "Profitez de fonctionnalités avancées pour un suivi amélioré",
      monthlyPrice: "49€",
      yearlyPrice: "35€",
      features: [
        "Support prioritaire",
        "Rapports et statistiques avancés",
        "Accès à de nouvelles fonctionnalités en avant-première",
        "Assistance dédiée",
      ],
    },
  ];

  const selectedPlans = planType
    ? plans.filter((plan) => plan.id === planType)
    : plans;

  return (
    <Body>
      <section>
        <div className="container mx-auto flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-6 max-w-5xl text-center">
            <h2 className="text-pretty text-4xl font-bold lg:text-6xl">
              Nos Formules
            </h2>
            <p className="text-muted-foreground lg:text-xl">
              Choisissez la formule qui vous convient le mieux
            </p>
            <div className="flex items-center gap-3 text-lg">
              Mensuel
              <Switch
                onCheckedChange={() => setIsYearly(!isYearly)}
                checked={isYearly}
              />
              Annuel
            </div>
            <div className="flex flex-col items-center md:flex-row md:justify-center md:items-stretch gap-6">
              {selectedPlans.map((plan) => (
                <Card key={plan.id} className="flex w-80 flex-col justify-between text-left">
                  <CardHeader>
                    <CardTitle>
                      <p>{plan.title}</p>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                    <span className="text-4xl font-bold">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <p className="text-muted-foreground">
                      Facturé {isYearly ? plan.yearlyPrice * 12 : plan.monthlyPrice * 12} par an
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Separator className="mb-6" />
                    <ul className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CircleCheck className="size-4" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button className="w-full">
                      Commencer
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Body>
  );
}
