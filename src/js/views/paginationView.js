import View from "./views.js";
import icons from "../../img/icons.svg";

class Pagination extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(handler) {
        this._parentElement.addEventListener("click", function (e) {
            const btn = e.target.closest(".btn--inline");
            if (!btn) return;

            const gotoPage = +btn.dataset.goto;
            console.log(gotoPage);
            handler(gotoPage);
        });
    }

    _generateMarkup() {
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );
        // console.log(numPages);
        // console.log(this._data.page);

        //Page 1 and other pages
        if (this._data.page === 1 && numPages > 1) {
            return `
          <button data-goto="${
              this._data.page + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }

        //last Page
        if (numPages > 1 && this._data.page === numPages) {
            return `<button data-goto="${
                this._data.page - 1
            }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${this._data.page - 1}</span>
              </button>
              `;
        }
        //Other Pages
        if (this._data.page < numPages) {
            return `<button data-goto="${
                this._data.page - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this._data.page - 1}</span>
                </button>
                <button data-goto="${
                    this._data.page + 1
                }" class="btn--inline pagination__btn--next">
                <span> Page ${this._data.page + 1}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </button>`;
        }
        //Page 1 and no other pages
        return "";
    }
}

export default new Pagination();
