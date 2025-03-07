import React, { useEffect, useState } from "react";
import CustomButton from "../components/pages/calculator/CustomButton";
import ProductCard from "../components/pages/calculator/ProductCard";
import MaterialCard from "../components/pages/calculator/MaterialCard";
import { CheckCircle, PlusCircle, ShieldCheck, RefreshCw } from "lucide-react";
import { Biere, BierePils, BiereRed, BiereTriple, JusDeCerise, Cerise, Houblon, Eau, Orge } from "../assets/product/indexProducts.ts";
import { supabase } from "../lib/supabaseClient";


const Calculator: React.FC = () => {
  const [counts, setCounts] = useState({ quota: 0, quotaPlus: 0, quotaFull: 0 });
  const [quotaData, setQuotaData] = useState<any>(null);
  const [recipeData, setRecipeData] = useState<any>(null);
  const [materials, setMaterials] = useState({ eau: 0, mout: 0, orge: 0, houblon: 0, cerise: 0 });
  const [products, setProducts] = useState({biere: 0, biere_red: 0, biere_pils: 0, biere_triple: 0, jus_de_cerise: 0 });

  // Fetch quota_information & product_recipe from "data" table
  useEffect(() => {
    const fetchData = async () => {
      const { data: quota, error: quotaError } = await supabase
        .from("data")
        .select("value")
        .eq("key", "quota_information")
        .single();

      const { data: recipes, error: recipeError } = await supabase
        .from("data")
        .select("value")
        .eq("key", "product_recipe")
        .single();

      if (quota) setQuotaData(quota.value);
      if (recipes) setRecipeData(recipes.value);

      if (quotaError) console.error("Erreur chargement quotas:", quotaError);
      if (recipeError) console.error("Erreur chargement recettes:", recipeError);
    };

    fetchData();

    // Realtime subscription for data changes
    const dataSubscription = supabase
      .channel("realtime-data")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "data", filter: "key=in.(quota_information,product_recipe)" },
        () => {
          console.log("Mise à jour en temps réel détectée !");
          fetchData();
        }
      )
      .subscribe();

    // Cleanup function to remove subscription
    return () => {
      supabase.removeChannel(dataSubscription);
    };
  }, []);

  // Quota action
  const applyQuota = () => {
    if (!quotaData || !recipeData) return;

    const quotaDescription = quotaData.quota.description;
    let newMaterials = { ...materials };
    let newProducts = { ...products };

    Object.entries(quotaDescription).forEach(([item, quantity]) => {
      if (quantity > 0) {
        if (recipeData[item]) {
          // Product ? → Add Product + Materials
          newProducts[item] += quantity;

          Object.entries(recipeData[item]).forEach(([ingredient, amount]) => {
            newMaterials[ingredient] += amount * quantity;
          });
        } else {
          // Materials ? → Directly Add Materials
          newMaterials[item] += quantity;
        }
      }
    });

    setCounts((prev) => ({ ...prev, quota: prev.quota + 1 }));
    setMaterials(newMaterials);
    setProducts(newProducts);
  };

  // Quota Bonus action
  const applyQuotaPlus = () => {
    if (!quotaData || !recipeData) return;

    const quotaBonusDescription = quotaData.quota_bonus.description;
    let newMaterials = { ...materials };
    let newProducts = { ...products };

    Object.entries(quotaBonusDescription).forEach(([item, quantity]) => {
      if (quantity > 0) {
        if (recipeData[item]) {
          // Product ? → Add Product + Materials
          newProducts[item] += quantity;

          Object.entries(recipeData[item]).forEach(([ingredient, amount]) => {
            newMaterials[ingredient] += amount * quantity;
          });
        } else {
          // Materials ? → Directly Add Materials
          newMaterials[item] += quantity;
        }
      }
    });

    setCounts((prev) => ({ ...prev, quotaPlus: prev.quotaPlus + 1 }));
    setMaterials(newMaterials);
    setProducts(newProducts);
  };

  // Quota Full action
  const applyQuotaFull = () => {
    if (!quotaData || !recipeData) return;

    const quotaDescription = quotaData.quota.description;
    const quotaBonusDescription = quotaData.quota_bonus.description;
    let newMaterials = { ...materials };
    let newProducts = { ...products };

    const applyQuotaLogic = (description: Record<string, number>) => {
      Object.entries(description).forEach(([item, quantity]) => {
        if (quantity > 0) {
          if (recipeData[item]) {
            // Product ? → Add Product + Materials
            newProducts[item] += quantity;

            Object.entries(recipeData[item]).forEach(([ingredient, amount]) => {
              newMaterials[ingredient] += amount * quantity;
            });
          } else {
            // Materials ? → Directly Add Materials
            newMaterials[item] += quantity;
          }
        }
      });
    };

    // Apply Quota + Quota Bonus
    applyQuotaLogic(quotaDescription);
    applyQuotaLogic(quotaBonusDescription);

    setCounts((prev) => ({ ...prev, quotaFull: prev.quotaFull + 1 }));
    setMaterials(newMaterials);
    setProducts(newProducts);
  };

  // Reset action
  const resetAll = () => {
    setCounts({ quota: 0, quotaPlus: 0, quotaFull: 0 });
    setMaterials({ eau: 0, mout: 0, orge: 0, houblon: 0, cerise: 0 });
    setProducts({ biere: 0, biere_red: 0, biere_pils: 0, biere_triple: 0, jus_de_cerise: 0 }); // Reset des produits
  };


  const handleProductInputChange = (productName: string, value: string) => {
    const numericValue = parseInt(value, 10) || 0; // Convertit l'entrée en nombre, ou 0 si invalide

    setProducts((prev) => {
      let newProducts = { ...prev, [productName]: numericValue };
      let newMaterials = { eau: 0, mout: 0, orge: 0, houblon: 0, cerise: 0 };

      // Recalculer les matériaux en fonction des nouveaux produits
      Object.entries(newProducts).forEach(([product, quantity]) => {
        if (recipeData[product]) {
          Object.entries(recipeData[product]).forEach(([ingredient, amount]) => {
            newMaterials[ingredient] += amount * quantity;
          });
        }
      });

      setMaterials(newMaterials);
      return newProducts;
    });
  };


  return (
    <div className="flex flex-col px-4 gap-12">
      <div className="w-full flex flex-row items-center gap-4">
        <CustomButton title="Quota" count={counts.quota} icon={CheckCircle} onClick={applyQuota} className="bg-green-500/90 text-[#263238]" setCounter={true} />
        <CustomButton title="Quota Bonus" count={counts.quotaPlus} icon={PlusCircle} onClick={applyQuotaPlus} className="bg-yellow-500/90 text-[#263238]" setCounter={true} />
        <CustomButton title="Quota Full" count={counts.quotaFull} icon={ShieldCheck} onClick={applyQuotaFull} className="bg-orange-500/90 text-[#263238]" setCounter={true} />
        <div className="w-full"></div>
        <CustomButton title="Reset" count={0} icon={RefreshCw} onClick={resetAll} className="bg-red-500/80 text-gray-200" setCounter={false} />
      </div>
      <div className="flex flex-col w-full py-4 px-12 gap-12">
        <div className="flex flex-row w-full justify-center gap-12">
          <ProductCard
            name="Jus de Cerise"
            quantity={products.jus_de_cerise}
            image={JusDeCerise}
            onInputChange={(e) => handleProductInputChange("jus_de_cerise", e.target.value)}
          />
          <ProductCard
            name="Bière"
            quantity={products.biere}
            image={Biere}
            onInputChange={(e) => handleProductInputChange("biere", e.target.value)}
          />
          <ProductCard
            name="Bière Pils"
            quantity={products.biere_pils}
            image={BierePils}
            onInputChange={(e) => handleProductInputChange("biere_pils", e.target.value)}
          />
          <ProductCard
            name="Bière Red"
            quantity={products.biere_red}
            image={BiereRed}
            onInputChange={(e) => handleProductInputChange("biere_red", e.target.value)}
          />
          <ProductCard
            name="Bière Triple"
            quantity={products.biere_triple}
            image={BiereTriple}
            onInputChange={(e) => handleProductInputChange("biere_triple", e.target.value)}
          />
        </div>

        <div className="w-full border border-gray-500 rounded-xl shadow-2xl h-0.5"></div>

        <div className="flex flex-row w-full px-12 justify-center gap-12">
          <div className="w-[20%]">
            <MaterialCard name="Cerise" total={materials.cerise} image={Cerise} textColor="text-red-400" />
          </div>
          <div className="flex flex-row w-[80%] gap-12">
            <div className="w-[25%]"></div>
            <MaterialCard name="Houblon" total={materials.houblon} image={Houblon} textColor="text-green-500" />
            <MaterialCard name="Eau de brasserie" total={materials.eau} image={Eau} textColor="text-gray-400" />
            <MaterialCard name="Orge" total={materials.orge} image={Orge} textColor="text-yellow-500" />
            <div className="w-[25%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
