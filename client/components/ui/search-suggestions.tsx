import React from "react";
import { Product } from "@/contexts/CartContext";
import { Search, Star, Clock } from "lucide-react";

interface SearchSuggestionsProps {
  query: string;
  products: Product[];
  categories: string[];
  onSuggestionClick: (suggestion: string) => void;
  onProductClick: (productId: string) => void;
  isVisible: boolean;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  products,
  categories,
  onSuggestionClick,
  onProductClick,
  isVisible,
}) => {
  if (!isVisible || !query.trim()) return null;

  // Filter products that match the search query
  const matchingProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 4); // Limit to 4 products

  // Filter categories that match the search query
  const matchingCategories = categories
    .filter(
      (category) =>
        category !== "All" &&
        category.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 3); // Limit to 3 categories

  // Generate search suggestions based on partial matches
  const searchSuggestions = [
    ...new Set([
      ...products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .map((p) => p.name)
        .slice(0, 3),
      ...products
        .filter((p) => p.category.toLowerCase().includes(query.toLowerCase()))
        .map((p) => p.category)
        .slice(0, 2),
    ]),
  ].slice(0, 5);

  const hasResults =
    matchingProducts.length > 0 ||
    matchingCategories.length > 0 ||
    searchSuggestions.length > 0;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
      {hasResults ? (
        <div className="p-2">
          {/* Search Suggestions */}
          {searchSuggestions.length > 0 && (
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Suggestions
              </div>
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
                  onClick={() => onSuggestionClick(suggestion)}
                >
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {/* Categories */}
          {matchingCategories.length > 0 && (
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Categories
              </div>
              {matchingCategories.map((category) => (
                <button
                  key={category}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
                  onClick={() => onSuggestionClick(category)}
                >
                  <div className="w-4 h-4 rounded bg-brand-green/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded bg-brand-green"></div>
                  </div>
                  <span>{category}</span>
                </button>
              ))}
            </div>
          )}

          {/* Products */}
          {matchingProducts.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Products
              </div>
              {matchingProducts.map((product) => (
                <button
                  key={product.id}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  onClick={() => onProductClick(product.id)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{product.name}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>₹{product.price}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{product.deliveryTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>No results found for "{query}"</p>
          <p className="text-sm mt-1">
            Try searching for products or categories
          </p>
        </div>
      )}
    </div>
  );
};
