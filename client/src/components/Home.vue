<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        <v-tooltip right>
          <v-btn
            slot="activator"
            icon
            large
            target="_blank"
          >
            <v-icon large>code</v-icon>
          </v-btn>
          <span>Source</span>
        </v-tooltip>
        <v-tooltip right>
          <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/qxQWda" target="_blank">
            <v-icon large>mdi-codepen</v-icon>
          </v-btn>
          <span>Codepen</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>
