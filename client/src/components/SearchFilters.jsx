import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SearchFilters = ({ searchTerm, onSearchChange, availabilityFilter, onAvailabilityChange }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by skills (e.g., Photoshop, Excel)"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-card border-border"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        </div>
      </div>
      <div className="flex gap-2">
        <Select value={availabilityFilter} onValueChange={onAvailabilityChange}>
          <SelectTrigger className="w-[200px] bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Availability</SelectItem>
            <SelectItem value="weekends">Weekends</SelectItem>
            <SelectItem value="evenings">Evenings</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilters;
