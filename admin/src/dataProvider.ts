import jsonServerProvider from "ra-data-json-server";
import { stringify } from 'query-string';
import { fetchUtils } from 'ra-core';

const apiUrl = import.meta.env.VITE_JSON_SERVER_URL
const httpClient = fetchUtils.fetchJson;

export const dataProvider = jsonServerProvider(apiUrl);

dataProvider.getList = (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
        ...fetchUtils.flattenObject(params.filter),
        _sort: field,
        _order: order,
        _start: (page - 1) * perPage,
        _end: page * perPage,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
        if (!headers.has('x-total-count')) {
            throw new Error(
                'The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?'
            );
        }
        return {
            data: json.map((resource: any) => ({ ...resource, id: resource._id })),
            total: parseInt(
                headers.get('x-total-count').split('/').pop(),
                10
            ),
        };
    });
};

dataProvider.getMany = (resource, params) => {
    const query = {
        id: params.ids,
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url)
        .then(({ json }) => ({
            data: json.map((resource: any) => ({ ...resource, id: resource._id }))
        }));
}

dataProvider.getOne = (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`)
        .then(({ json }) => {
            json.id = json._id;
            return ({data: json});
        });
