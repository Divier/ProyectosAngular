import { Inmueble } from 'src/app/models/backend/inmueble.interface';

export {Inmueble as InmuebleResponse} from 'src/app/models/backend/inmueble.interface';

export type InmuebleCreateRequest = Omit<Inmueble, 'id' | 'fechaCreacion'>;
