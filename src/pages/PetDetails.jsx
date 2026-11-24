
import { Link, useParams } from 'react-router-dom'
import { pets } from '../data/pets'

export default function PetDetails() {
    const { id } = useParams()

    const pet = pets.find((item) => item.id === Number(id))

    if (!pet) {
        return (
            <section className="min-h-screen bg-[#f8f7f2] flex flex-col items-center justify-center px-5">
                <h1 className="text-3xl font-bold text-[#183d2b]">
                    Pet Not Found
                </h1>

                <Link
                    to="/pets"
                    className="mt-6 rounded-full bg-[#244b37] px-7 py-3 text-white"
                >
                    Back to All Pets
                </Link>
            </section>
        )
    }

    return (
        <main className="min-h-screen bg-[#f8f7f2] px-6 py-12 md:px-10">
            <div className="mx-auto max-w-6xl">

                <Link
                    to="/pets"
                    className="mb-8 inline-block text-sm font-semibold text-[#a66c43] hover:underline"
                >
                    ← Back to All Pets
                </Link>

                <div className="grid items-center gap-10 overflow-hidden rounded-3xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-10">

                    <div>
                        <img
                            src={pet.image}
                            alt={pet.name}
                            className="h-[350px] w-full rounded-3xl object-cover md:h-[480px]"
                        />
                    </div>

                    <div className="py-5">

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a66c43]">
                            Meet your new best friend
                        </p>

                        <h1 className="mt-4 text-4xl font-bold text-[#183d2b] md:text-5xl">
                            Meet {pet.name}
                        </h1>

                        <p className="mt-4 text-lg text-[#68766b]">
                            {pet.breed}
                        </p>

                        <div className="mt-7 grid grid-cols-2 gap-4">

                            <div className="rounded-2xl bg-[#f1f2e9] p-5">
                                <p className="text-xs text-[#68766b]">Age</p>
                                <p className="mt-2 font-semibold text-[#183d2b]">
                                    {pet.age}
                                </p>
                            </div>

                            <div className="rounded-2xl bg-[#f1f2e9] p-5">
                                <p className="text-xs text-[#68766b]">Pet Type</p>
                                <p className="mt-2 font-semibold text-[#183d2b]">
                                    {pet.type}
                                </p>
                            </div>

                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-[#183d2b]">
                                About {pet.name}
                            </h2>

                            <p className="mt-3 leading-7 text-[#68766b]">
                                {pet.description}
                            </p>
                        </div>

                        <Link
                            to="/contact"
                            className="mt-8 inline-flex rounded-full bg-[#244b37] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#183d2b]"
                        >
                            Enquire About Adoption ↗
                        </Link>

                    </div>
                </div>
            </div>
        </main>
    )
}
