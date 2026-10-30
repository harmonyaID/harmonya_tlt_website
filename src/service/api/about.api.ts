import { _shapeMethodGetSearch } from '@/service/api/@config/configAPIPublic'
import { SrvTeam } from '@/service/api/_crm.endPoint'

export const getTeamList = (formSearch: any, tc: string = 'tcTeams') =>
    _shapeMethodGetSearch(SrvTeam, formSearch, tc)
