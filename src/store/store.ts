import { types, flow, cast } from 'mobx-state-tree';
import axios from 'axios';

const RecordingLimit = types.model({
  localEnabled: types.boolean,
  serverEnabled: types.boolean,
  serverLimitValue: types.number,
  _id: types.identifier,
});

const Organization = types.model({
  _id: types.identifier,
  name: types.string,
  domain: types.optional(types.string, ''),
  exp: types.number,
  participants: types.number,
  recordingLimit: RecordingLimit,
});

const OrganizationStore = types
  .model({
    organizations: types.array(Organization),
  })
  .actions((self) => ({
    fetchOrganizations: flow(function* () {
      try {
        const response = yield axios.get(
          'https://dev.mintconf.ru/api/external/1b12a024ef1f9cd0532e3c55357fe5b0/orgs'
        );

        if (response.data.status === 'error')
          return 'Ошибка при получении организаций';

        self.organizations = response.data.orgs;
      } catch (error) {
        return `Ошибка при получении организаций: ${error}`;
      }
    }),

    addOrganization: flow(function* (name: string, exp: Date | null) {
      try {
        const response = yield axios.post(
          'https://dev.mintconf.ru/api/external/1b12a024ef1f9cd0532e3c55357fe5b0/orgs',
          {
            name,
            exp: exp?.getTime() || Date.now(),
            participants: 0,
            domain: '',
            recordingLimit: {
              localEnabled: false,
              serverEnabled: true,
              serverLimitValue: 2147483648,
            },
          }
        );
        if (response.data.status === 'error')
          return 'Ошибка при добавлении организаций';

        self.organizations.unshift(response.data.org);
      } catch (error) {
        return `Ошибка при добавлении организаций: ${error}`;
      }
    }),

    deleteOrganization: flow(function* (id: string) {
      try {
        const response = yield axios.delete(
          'https://dev.mintconf.ru/api/external/1b12a024ef1f9cd0532e3c55357fe5b0/orgs/',
          {
            data: {
              id,
            },
          }
        );

        if (response.data.status === 'error')
          return 'Ошибка при удалении организаций';

        self.organizations = cast(
          self.organizations.filter((org) => org._id !== id)
        );
      } catch (error) {
        return `Ошибка при удалении организаций: ${error}`;
      }
    }),
  }));

export const orgStore = OrganizationStore.create({ organizations: [] });
