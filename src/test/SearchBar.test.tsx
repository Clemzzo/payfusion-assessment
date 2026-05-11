import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "@/components/countries/SearchBar";

describe("SearchBar", () => {
  it("emits keystrokes via onChange", async () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} placeholder="Search…" />);
    const input = screen.getByLabelText("Search…");
    await userEvent.type(input, "nig");
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith("g");
  });

  it("renders the controlled value", () => {
    render(
      <SearchBar value="hello" onChange={() => {}} placeholder="Search…" />,
    );
    expect(screen.getByLabelText("Search…")).toHaveValue("hello");
  });
});
