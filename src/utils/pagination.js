const parsePageAndPageSize = ({ page, pageSize, defaultPageSize = 10 }) => {
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);
    const parsedPage = Number.isInteger(pageNumber) ? pageNumber : 1;
    const parsedPageSize = Number.isInteger(pageSizeNumber)
        ? pageSizeNumber
        : defaultPageSize;

    return { page: parsedPage, pageSize: parsedPageSize };
};

const getLimitAndOffset = ({
    page: rawPage,
    pageSize: rawPageSize,
    defaultPageSize = 10
}) => {
    const { page, pageSize } = parsePageAndPageSize({
        page: rawPage,
        pageSize: rawPageSize,
        defaultPageSize
    });

    return {
        limit: pageSize,
        offset: (page - 1) * pageSize
    };
};

const mountPagination = ({
    page: rawPage,
    pageSize: rawPageSize,
    count,
    defaultPageSize = 10
}) => {
    const { page, pageSize } = parsePageAndPageSize({
        page: rawPage,
        pageSize: rawPageSize,
        defaultPageSize
    });

    return {
        page,
        pageSize,
        count,
        totalPages: Math.ceil(count / pageSize)
    };
};

module.exports = {
    parsePageAndPageSize,
    getLimitAndOffset,
    mountPagination
};
