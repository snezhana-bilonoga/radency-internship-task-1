export default class CategoriesTable {
    constructor(root) {
        this.root = root;
        this.innerHTML = `
        <table class="categories">
            <thead>
                <tr>
                    <th>Note Category</th>
                    <th>Active</th>
                    <th>Archived </th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        `;
        this.root.insertAdjacentHTML('beforeend', this.innerHTML);
    }

    _createCategoryRowHTML(category, activeCounter, archivedCounter) {
        return `
        <tr>
            <td>${category}</td>
            <td>${activeCounter}</td>
            <td>${archivedCounter}</td>
        </tr>
       `;
    }

    updateCategoriesTable(notes) {
        const categoriesContainer = this.root.querySelector(".categories tbody");
        categoriesContainer.innerHTML = "";

        notes.reduce((acc, el) => {
            if (!acc.find(accEl => accEl.category === el.category)) {
                acc.push({
                    category: el.category,
                    active: 0,
                    archived: 0
                });
            }

            const categoryObj = acc.find(accEl => accEl.category === el.category);
            
            if (el.isArchived) {
                categoryObj.archived = categoryObj.archived + 1;
            } else {
                categoryObj.active = categoryObj.active + 1;
            }

            return acc;
        }, [])
        .forEach(categoryObj => {
            const html = this._createCategoryRowHTML(categoryObj.category, categoryObj.active, categoryObj.archived);
            categoriesContainer.insertAdjacentHTML("beforeend", html);
        });
    }
}
