$(document).ready(function() {
    $("form").submit(function(event) {
        event.preventDefault();
        let valueInput = $("#PokemonInput").val();
        $.ajax({
            url: "https://pokeapi.co/api/v2/pokemon/"+valueInput,
            success: function(data) {
                let nombre = data.name
                let imagen = data.sprites.front_default
                let peso = data.weight
                
                $("#PokemonName").html(`
                    <div class="text-center">
                        <h3>${nombre}</h3>
                        <img src="${imagen}">
                        <h6>Weight: ${peso}kg</h6>
                    </div>
                `)

                let estadisticas = []
                data.stats.forEach(function(s) {
                    estadisticas.push( {
                        label: s.stat.name,
                        y: s.base_stat,
                    });
                });

                let config = {
                    animationEnabled: true,
                    data: [
                        {
                            type: "column",
                            dataPoints: estadisticas,
                        },
                    ],
                    title: {
                        text: "Stats"
                    },
                    axisY: {
                        title: "Values"
                    },
                    axisX: {
                        title: "Stats"
                    },
                };

                let chart = new CanvasJS.Chart("chartContainer", config);
                chart.render();
            },
        });
    });
});