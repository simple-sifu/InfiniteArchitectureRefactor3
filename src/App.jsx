import "./styles.css";
import * as React from "react";

const App = () => {
  const data = {
    brands: [
      {
        name: "Tesla",
        financeLengthInMonths: 24,
        models: [
          {
            modelName: "Roadster",
            features: [{ name: "coupe" }, { name: "autopilot" }]
          },
          {
            modelName: "Model X",
            features: [{ name: "gull wing doors" }]
          },
          {
            modelName: "Cyber Truck",
            features: [{ name: "exoskeleton" }],
            financeApplyLink: "http://finance.com/apply"
          }
        ]
      },
      {
        name: "Ford",
        financeLengthInMonths: 36,
        models: [
          {
            modelName: "Petrol Mustang",
            features: [{ name: "fuel guage" }]
          },
          {
            modelName: "Electric Mustang",
            features: [
              { name: "electric charging point" },
              { name: "battery" }
            ],
            financeApplyLink: "http://finance.com/apply"
          },
          {
            modelName: "Petrol Mustang",
            features: []
          }
        ]
      },
      {
        name: "Peugeot",
        financeLengthInMonths: 0,
        models: [
          {
            modelName: "208",
            features: [{ name: "alloys wheels" }]
          },
          {
            modelName: "508 Hybrid",
            features: [
              { name: "electric charging point" },
              { name: "battery" },
              { name: "fuel guage" }
            ]
          }
        ]
      }
    ]
  };

  const hasFinance = brand => {
    let hasFinanceLink = false;
    brand.models.forEach(model => {
      if (Object.hasOwn(model, "financeApplyLink")) hasFinanceLink = true;
    });
    if (brand.financeLengthInMonths > 0 && hasFinanceLink) {
      return true;
    } else return false;
  };

  // create a viewmodel here
  const viewModel = [];
  viewModel.brands = data.brands.map(brandVm => {
    const canFinance = hasFinance(brandVm);
    return {
      title: `${brandVm.name} has ${brandVm.models.length} cars available ${
        canFinance ? "(has finance)" : "(has no finance)"
      }`,
      canFinance,
      models: brandVm.models.map(modelVm => {
        modelVm.hasFinanceApplyLink = Object.hasOwn(
          modelVm,
          "financeApplyLink"
        );
        return modelVm;
      }),
      features:
        "[" +
        brandVm.models
          .reduce((acc, modelVm) => {
            modelVm.features.map(feature => {
              acc.push(feature.name);
            });
            return acc;
          }, [])
          .join(", ") +
        "]"
    };
  });

  return (
    <>
      {viewModel.brands.map(brandVm => {
        return (
          <p>
            {brandVm.title}
            <br />
            {brandVm.models.map(modelVm => (
              <div>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{modelVm.modelName}
                {modelVm.hasFinanceApplyLink && (
                  <span>
                    &nbsp;&nbsp;
                    <a href="modelVm.financeApplyLink">(apply for finance)</a>
                  </span>
                )}
              </div>
            ))}
            <br />
            <div>{`Brand features : ${brandVm.features}`}</div>
          </p>
        );
      })}
    </>
  );
};

export default App;
